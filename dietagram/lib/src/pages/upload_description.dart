import 'package:dietagram/src/controller/upload_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:dietagram/src/components/image_data.dart';

class UploadDescription extends GetView<UploadController> {
  const UploadDescription({Key? key}) : super(key: key);

  Widget _description(){
    return Padding(
      padding: const EdgeInsets.all(15.0),
      child: Row(
        children: [
          SizedBox(
            width: 60,
            height: 60,
            child: Image.file(
              controller.filteredImage!,
              fit: BoxFit.cover,
            ),
          ),
          Expanded(
            child: TextField(
              controller: controller.textEditingController,
              maxLines: null,
              decoration: const InputDecoration(
                border: InputBorder.none,
                focusedBorder: InputBorder.none,
                enabledBorder: InputBorder.none,
                errorBorder: InputBorder.none,
                disabledBorder: InputBorder.none,
                contentPadding: EdgeInsets.only(
                  left: 15.0
                ),
                hintText: '문구 입력...'
              ),
            ),
          )
        ],
      ),
    );
  }

  Widget get line => const Divider(
    color: Color(0xff808080),
  );

  Widget infoOnt(String title){
    return Padding(
      padding: const EdgeInsets.symmetric(
        vertical: 7,
        horizontal: 15
      ),
      child: Text(
        title,
        style: const TextStyle(
          fontSize: 17
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        leading: GestureDetector(
          onTap: Get.back,
          child: Padding(
            padding: const EdgeInsets.all(15.0),
            child: ImageData(
              IconsPath.backBtnIcon,
              width: 50,
            ),
          ),
        ),
        title: const Text(
          'New Post',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 20
          ),
        ),
        actions: [
          GestureDetector(
            onTap: controller.uploadPost,
            child: Padding(
              padding: const EdgeInsets.all(15.0),
              child: ImageData(
                IconsPath.uploadComplete,
                width:50,
              ),
            ),
          )
        ],
      ),
      body: Stack(
        children:[
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            child: Container(
              child: GestureDetector(
                onTap: controller.unfocusKeyboard,
                child: SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      _description(),
                      line,
                      infoOnt('사람 태그하기'),
                      line,
                      infoOnt('위치 추가'),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ]
      ),
    );
  }
}