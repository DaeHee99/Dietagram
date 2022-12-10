// nvm use 17
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer');
var indexRouter = require('./routes/index');
const fs = require('fs');
var app = express();
const spawn = require('child_process').spawn
let cors = require('cors');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// CORS 설정
app.use(cors());
 
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'image/test/data'); // 라는 폴더 안에 저장
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname); // 파일의 확장자
            done(null, path.basename(file.originalname, ext) + ext); // 파일이름 + 날짜 + 확장자 이름으로 저장
        }
    })
});

app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'public', 'multipart.html'));
});

app.post('/upload', upload.single('image'), async (req, res) => {
    console.log(req.file, req.body); 

    // python
    const net = spawn('python',['detect_new.py', '--cfg', 'cfg/yolov3-spp-403cls.cfg', '--names', 'data/403food.names', '--weights', 'weights/best_403food_e200b150v2.pt']);
    net.stdout.on('data', function(data) { 
        fs.readFile('./output/result.txt', 'utf-8', function(error, data) {
            result_str = data.toString().split(',');

            if (result_str[0] === 'NO DATA') {
                res.status(200).send('NO DATA');
            }
            else {
                result = {
                    'name' : result_str[0],
                    'weight_g' : result_str[1],
                    'calorie_kcal' : result_str[2],
                    'Carbohydrate_g' : result_str[3],
                    'sugars_g' : result_str[4],
                    'fat_g' : result_str[5],
                    'protein_g' : result_str[6],
                    'calcium_mg' : result_str[7],
                    'phosphorus_mg' : result_str[8],
                    'sodium_mg' : result_str[9],
                    'potassium_mg' : result_str[10],
                    'magnesium_mg' : result_str[11],
                    'iron_mg' : result_str[12],
                    'zinc_mg' : result_str[13],
                    'cholesterol_mg' : result_str[14],
                    'transFat_g' : result_str[15]
                }
    
                res.status(200).send(JSON.stringify(result));
            }
        });

        fs.rmdir("./image/test/data",{ recursive: true }, err => {
            if(err) console.log("err : ", err);
            if(!fs.existsSync("./image/test/data")) fs.mkdirSync("./image/test/data");
        })
    })
})

module.exports = app;

// 'name' : 음식이름
// 'weight_g' : 중량
// 'calorie_kcal' : 에너지
// 'Carbohydrate_g' : 탄수화물
// 'sugars_g' : 당류
// 'fat_g' : 지방
// 'protein_g' : 단백질
// 'calcium_mg' : 칼슘
// 'phosphorus_mg' : 인
// 'sodium_mg' : 나트륨
// 'potassium_mg' : 칼륨
// 'magnesium_mg' : 마그네슘
// 'iron_mg' : 철
// 'zinc_mg' : 아연
// 'cholesterol_mg' : 콜레스테롤
// 'transFat_g' : 트랜스지방