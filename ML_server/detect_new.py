from __future__ import print_function, division
# -*-coding:utf-8-*-
import argparse

from models import *  # set ONNX_EXPORT in models.py
from utils.datasets import *
from utils.utils import *
from xml.etree.ElementTree import Element, SubElement, ElementTree
import numpy as np
import platform as pf
import psutil
import PIL
import pandas as pd
import seaborn as sns
import csv


##################################### 양 예측 #####################################

import torch
import torch.nn as nn
import torch.optim as optim
from torch.optim import lr_scheduler
import torchvision
from torchvision import datasets, models, transforms
import matplotlib
import matplotlib.pyplot as plt
import time
import os
import copy
from PIL import Image
import torch
import torch.nn as nn
import torch.optim as optim
from torch.optim import lr_scheduler
from os import listdir
from os.path import isfile, join
import glob
from torch.autograd import Variable
import torch.nn.functional as F
import platform
from datetime import date
import datetime, time
import sklearn.metrics as metrics
from sklearn.metrics import confusion_matrix
from sklearn.metrics import classification_report
plt.ion()

def quantity():    
    data_transforms = {
            'test': transforms.Compose([
            transforms.RandomResizedCrop(224),
            transforms.RandomHorizontalFlip(),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])])}

    data_dir = 'image'

    path = {x: os.path.join(os.path.dirname(os.path.abspath("./image/")),data_dir,x)
                    for x in ['test']}


    image_datasets = {x: datasets.ImageFolder(path[x],
                                            data_transforms[x])
                    for x in ['test']}

    dataloaders = { 'test' : torch.utils.data.DataLoader(image_datasets['test'], batch_size=84,
                                                shuffle=True, num_workers=4)  }

    dataset_sizes = {x: len(image_datasets[x]) for x in ['test']}

    class_names = image_datasets['test'].classes

    filenames = glob.glob('./image/test/*/*.JPG')

    def load_checkpoint(filepath, map_location='cpu'):
        checkpoint = torch.load(filepath, map_location=torch.device('cpu'))
        model = checkpoint['model_ft']
        model.load_state_dict(checkpoint['state_dict'], strict=False)
        model.class_to_idx = checkpoint['class_to_idx']
        optimizer_ft = checkpoint['optimizer_ft']
        epochs = checkpoint['epochs']

        for param in model.parameters():
            param.requires_grad = False

        return model, checkpoint['class_to_idx']

    ckpt = torch.load("./weights/new_opencv_ckpt_b84_e200.pth", map_location=torch.device('cpu'))
    ckpt.keys()

    model, class_to_idx = load_checkpoint("./weights/new_opencv_ckpt_b84_e200.pth")

    image_size = 224
    norm_mean = [0.485, 0.456, 0.406]
    norm_std = [0.229, 0.224, 0.225]

    # map_location = 'cpu'
    map_location = torch.device('cpu')

    strict = False

    device = torch.device(map_location)
            

    def predict2(image_path, model, topk=5):
        img = Image.open(image_path)
        img = process_image(img)

        img = np.expand_dims(img, 0)

        img = torch.from_numpy(img)

        model.eval()
        inputs = Variable(img).to(device)
        logits = model.forward(inputs)

        ps = F.softmax(logits, dim=1)
        topk = ps.cpu().topk(topk)

        return (e.data.numpy().squeeze().tolist() for e in topk)
        
    def process_image(image):
        preprocess = transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                std=[0.229, 0.224, 0.225])])
        image = preprocess(image)
        return image
                
                
    path = './image/test/*/*.JPG'
    length = len(glob.glob(path))

    def classPred(x, path):
        filename, Classes, Probs = [], [], []
        for i in range(x):
            im = glob.glob(path)
            probs, classes = predict2(im[i], model.to(device))
            class_names = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5']
            food_names = [class_names[e] for e in classes]
            filename.append(im[i])
            output = [filename]
            output.append(classes)
            output.append(probs)
            Classes.append(classes)
            Probs.append(probs)

        return filename , Classes, Probs
    
            
    filename, Classes, Probs = classPred(length, path)

    
    cls_name = {'Q1': 0, 'Q2': 1, 'Q3':2, 'Q4':3, 'Q5': 4}   


    classes = []
    for i in range(len(Classes)):
        classes.append(Classes[i][0])
    
    if (len(classes) == 0): classes.append(3)
        
        
    return classes[0]

##################################### 양 예측 #####################################


def indent(elem, level=0):  #
    i = "\n" + level * "  "
    if len(elem):
        if not elem.text or not elem.text.strip():
            elem.text = i + "  "
        if not elem.tail or not elem.tail.strip():
            elem.tail = i
        for elem in elem:
            indent(elem, level + 1)
        if not elem.tail or not elem.tail.strip():
            elem.tail = i
    else:
        if level and (not elem.tail or not elem.tail.strip()):
            elem.tail = i

food_names = pd.read_csv('./foodData/음식AI데이터분류.csv', header = 1)
food_names.index = food_names['소분류코드']
food_names = food_names[['소분류구분']]

def numToName(num):
    food_num = int(num)
    if food_num in food_names.index:
        return food_names.loc[food_num, '소분류구분']
    else:
        return 'NO DATA'


    
def detect(save_img=False):
    imgsz = (320, 192) if ONNX_EXPORT else opt.img_size  # (320, 192) or (416, 256) or (608, 352) for (height, width)
    out, source, weights, half, view_img, save_txt, save_xml = opt.output, opt.source, opt.weights, opt.half, opt.view_img, opt.save_txt, opt.save_xml
    webcam = source == '0' or source.startswith('rtsp') or source.startswith('http') or source.endswith('.txt')

    # Initialize
    device = torch_utils.select_device(device='cpu' if ONNX_EXPORT else opt.device)
    if os.path.exists(out):
        shutil.rmtree(out)  # delete output folder
    os.makedirs(out)  # make new output folder

    # Initialize model
    model = Darknet(opt.cfg, imgsz)

    # Load weights
    attempt_download(weights)
    if weights.endswith('.pt'):  # pytorch format
        model.load_state_dict(torch.load(weights, map_location=device)['model'], strict=False)
    else:  # darknet format
        load_darknet_weights(model, weights)

    # Second-stage classifier
    classify = False
    if classify:
        modelc = torch_utils.load_classifier(name='resnet101', n=2)  # initialize
        modelc.load_state_dict(torch.load('weights/resnet101.pt', map_location=device)['model'],
                               strict=False)  # load weights
        modelc.to(device).eval()

    # Eval mode
    model.to(device).eval()

    # Fuse Conv2d + BatchNorm2d layers
    # model.fuse()

    # Export mode
    if ONNX_EXPORT:
        model.fuse()
        img = torch.zeros((1, 3) + imgsz)  # (1, 3, 320, 192)
        f = opt.weights.replace(opt.weights.split('.')[-1], 'onnx')  # *.onnx filename
        torch.onnx.export(model, img, f, verbose=False, opset_version=11,
                          input_names=['images'], output_names=['classes', 'boxes'])

        # Validate exported model
        import onnx
        model = onnx.load(f)  # Load the ONNX model
        onnx.checker.check_model(model)  # Check that the IR is well formed
        print(onnx.helper.printable_graph(model.graph))  # Print a human readable representation of the graph
        return

    # Half precision
    half = half and device.type != 'cpu'  # half precision only supported on CUDA
    if half:
        model.half()

    # Set Dataloader
    vid_path, vid_writer = None, None
    if webcam:
        view_img = True
        torch.backends.cudnn.benchmark = True  # set True to speed up constant image size inference
        dataset = LoadStreams(source, img_size=imgsz)
    else:
        save_img = True
        dataset = LoadImages(source, img_size=imgsz)

    # Get names and colors
    names = load_classes(opt.names)
    colors = [[random.randint(0, 255) for _ in range(3)] for _ in range(len(names))]
    rslt = []
    nT = 0
    nF = 0
    nN = 0
    nND = 0
    # Run inference
    t0 = time.time()
    img = torch.zeros((1, 3, imgsz, imgsz), device=device)  # init img
    _ = model(img.half() if half else img.float()) if device.type != 'cpu' else None  # run once
    for path, img, im0s, vid_cap in dataset:
        img = torch.from_numpy(img).to(device)
        img = img.half() if half else img.float()  # uint8 to fp16/32
        img /= 255.0  # 0 - 255 to 0.0 - 1.0
        if img.ndimension() == 3:
            img = img.unsqueeze(0)

        # Inference
        t1 = torch_utils.time_synchronized()
        pred = model(img, augment=opt.augment)[0]
        t2 = torch_utils.time_synchronized()

        # to float
        if half:
            pred = pred.float()

        # Apply NMS
        pred = non_max_suppression(pred, opt.conf_thres, opt.iou_thres,
                                   multi_label=False, classes=opt.classes, agnostic=opt.agnostic_nms)

        # Apply Classifier
        if classify:
            pred = apply_classifier(pred, modelc, img, im0s)

        # Process detections
        for i, det in enumerate(pred):  # detections for image i
            if webcam:  # batch_size >= 1
                p, s, im0 = path[i], '%g: ' % i, im0s[i].copy()
            else:
                p, s, im0 = path, '', im0s

            save_path = str(Path(out) / Path(p).name)
            #s += '%gx%g ' % img.shape[2:]  # print string
            gn = torch.tensor(im0.shape)[[1, 0, 1, 0]]  #  normalization gain whwh

            root = Element('annotation')
            SubElement(root, 'folder').text = str(Path(out))
            SubElement(root, 'filename').text = str(Path(p))
            SubElement(root, 'path').text = save_path

            if det is not None and len(det):
                # Rescale boxes from imgsz to im0 size
                det[:, :4] = scale_coords(img.shape[2:], det[:, :4], im0.shape).round()
                count = 0

                # Print results
                for c in det[:, -1].unique():
                    n = (det[:, -1] == c).sum()  # detections per class
                    # print('------------',)
                    foodName = numToName(names[int(c)])
                    if foodName != 'NO DATA':
                        s += '%s %s' % (foodName, quantity())  # add to string
                        quan = quantity()
                        f = open('./output/result.txt', 'w', encoding="UTF-8")

                        csvf = open('./foodData/foodDB.csv', 'r', encoding='utf-8')
                        rdr = csv.reader(csvf)
                        for line in rdr:
                            if(line[0] == foodName):
                                f.write(foodName + ',')
                                f.write(str(float(line[1]) * ((quan+1) / 4)) + ',')
                                f.write(str(float(line[2]) * ((quan+1) / 4)) + ',')
                                f.write(str(float(line[3]) * ((quan+1) / 4)) + ',')
                                f.write(str(float(line[4]) * ((quan+1) / 4)) + ',')
                                f.write(str(float(line[5]) * ((quan+1) / 4)) + ',')
                                f.write(str(float(line[6]) * ((quan+1) / 4)) + ',')
                                f.write(str(float(line[7]) * ((quan+1) / 4)) + ',')
                                f.write(str(float(line[8]) * ((quan+1) / 4)) + ',')
                                f.write(str(float(line[9]) * ((quan+1) / 4)) + ',')
                                f.write(str(float(line[10]) * ((quan+1) / 4)) + ',')
                                f.write(str(float(line[11]) * ((quan+1) / 4)) + ',')
                                f.write(str(float(line[12]) * ((quan+1) / 4)) + ',')
                                f.write(str(float(line[13]) * ((quan+1) / 4)) + ',')
                                f.write(str(float(line[14]) * ((quan+1) / 4)) + ',')
                                f.write(str(float(line[15]) * ((quan+1) / 4)) + ',')
                            
                        csvf.close()
                        f.close()
                    else:
                        f = open('./output/result.txt', 'w', encoding="UTF-8")
                        
                        f.write('NO DATA')

                        f.close()
                    # s += '%s, ' % (ToF(str(Path(p)), names[int(c)]))  # add True or False

                total = []
                object_names = []

                # Write results
                for *xyxy, conf, cls in reversed(det):
                    label = '%s %.2f' % (names[int(cls)], conf)
                    if save_txt:  # Write to file(xml ?�일)
                        xywh = (xyxy2xywh(torch.tensor(xyxy).view(1, 4)) / gn).view(-1).tolist()  # normalized xywh
                        with open(save_path[:save_path.rfind('.')] + '.txt', 'a') as file:
                            file.write(('%g ' * 5 + '\n') % (cls, *xywh))  # label format

                    #if save_xml:
                    semi = []
                    for nums in range(4):  ## total??좌표 ?�??
                        str_x = str(xyxy[nums]).split('(')
                        str_x = str_x[1].split('.')
                        semi.append(str_x[0])
                    total.append(semi)
                    object_names.append(names[int(cls)])
                    count = count + 1
                    
                    tnT = 0
                    tnF = 0
                    tnN = 0
                    
                    if save_img or view_img:  # Add bbox to image
                        plot_one_box(xyxy, im0, label=label, color=colors[int(cls)])

                    for i in range(count):  ##리스트 두 개 xml파일에 저장
                        object_xml = SubElement(root, 'object')
                        SubElement(object_xml, 'name').text = object_names[i]
                        bndbox = SubElement(object_xml, 'bndbox')
                        SubElement(bndbox, 'xmin').text = str(total[i][0])
                        SubElement(bndbox, 'ymin').text = str(total[i][1])
                        SubElement(bndbox, 'xmax').text = str(total[i][2])
                        SubElement(bndbox, 'ymax').text = str(total[i][3])
                        
                nT += 1 if tnT > 1 else tnT
                nND += 1 if tnF == 0 and tnT == 0 else 0
                nF += 1 if tnF > 1 else tnF

                if save_xml:
                    indent(root)
                    tree = ElementTree(root)
                    tree.write(save_path[:save_path.rfind('.')] + '.xml', encoding='utf-8',
                               xml_declaration=True)  ##아웃풋 폴더에 jpg와 xml 생성

            # Print time (inference + NMS)
            print('%s (%.3fs)' % (s, t2 - t1))

            # Stream results
            if view_img:
                cv2.imshow(p, im0)
                if cv2.waitKey(1) == ord('q'):  # q to quit
                    raise StopIteration

    print('Done. (%.3fs)' % (time.time() - t0))
    tot = nT + nF + nND
    accu = nT / tot
    with open('./classificaion_result.txt','w') as f:
        rslt = [r + '\n' for r in rslt]
        f.writelines(rslt)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--cfg', type=str, default='cfg/yolov3-spp.cfg', help='*.cfg path')
    parser.add_argument('--names', type=str, default='data/coco.names', help='*.names path')
    parser.add_argument('--weights', type=str, default='weights/yolov3-spp-ultralytics.pt', help='weights path')
    parser.add_argument('--source', type=str, default='image/test/data', help='source')  # input file/folder, 0 for webcam
    parser.add_argument('--output', type=str, default='output', help='output folder')  # output folder
    parser.add_argument('--img-size', type=int, default=320, help='inference size (pixels)')
    parser.add_argument('--conf-thres', type=float, default=0.3, help='object confidence threshold')
    parser.add_argument('--iou-thres', type=float, default=0.5, help='IOU threshold for NMS')
    parser.add_argument('--fourcc', type=str, default='mp4v', help='output video codec (verify ffmpeg support)')
    parser.add_argument('--half', action='store_true', help='half precision FP16 inference')
    parser.add_argument('--device', default='', help='device id (i.e. 0 or 0,1) or cpu')
    parser.add_argument('--view-img', action='store_true', help='display results')
    parser.add_argument('--save-txt', action='store_true', help='save results to *.txt')
    parser.add_argument('--classes', nargs='+', type=int, help='filter by class')
    parser.add_argument('--agnostic-nms', action='store_true', help='class-agnostic NMS')
    parser.add_argument('--augment', action='store_true', help='augmented inference')
    parser.add_argument('--save-xml', action='store_true', help='save results to *.xml')
    opt = parser.parse_args()
    opt.cfg = check_file(opt.cfg)  # check file
    opt.names = check_file(opt.names)  # check file
    print(len(os.listdir(opt.source)))

    with torch.no_grad():
        detect()