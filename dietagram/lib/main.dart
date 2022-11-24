import 'package:dietagram/src/binding/init_bindings.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:dietagram/src/app.dart';
import 'package:dietagram/src/controller/bottom_nav_controller.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      theme: ThemeData(
          primarySwatch: Colors.blue,
          appBarTheme: const AppBarTheme(
            backgroundColor: Colors.white,
            titleTextStyle: TextStyle(color: Colors.black),
          )),
      debugShowCheckedModeBanner: false,
      initialBinding: InitBinding(),
      home: LoginPage(),
    );
  }

  // This widget is the root of your application.
  // @override
  // Widget build(BuildContext context) {
  //   return GetMaterialApp(
  //     title: 'Flutter Demo',
  //     theme: ThemeData(
  //         primarySwatch: Colors.blue,
  //         appBarTheme: const AppBarTheme(
  //           backgroundColor: Colors.white,
  //           titleTextStyle: TextStyle(color: Colors.black),
  //         )),
  //     initialBinding: InitBinding(),
  //     home: const App(),
  //   );
  // }
}

/// 로그인 페이지
class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // title: Text(
        //   "Dietgram",
        //   style: TextStyle(color: Colors.black),
        // ),
        title: Image.asset(
          "assets/images/logo.png",
          width: 96,
        ),
        // backgroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            /// 현재 유저 로그인 상태
            // Center(
            //   child: Text(
            //     "로그인해 주세요 🙂",
            //     style: TextStyle(
            //       fontSize: 24,
            //     ),
            //   ),
            // ),
            SizedBox(height: 32),

            /// 이메일
            TextField(
              controller: emailController,
              decoration: InputDecoration(hintText: "이메일"),
            ),

            /// 비밀번호
            TextField(
              controller: passwordController,
              obscureText: false, // 비밀번호 안보이게
              decoration: InputDecoration(hintText: "비밀번호"),
            ),
            SizedBox(height: 32),

            /// 로그인 버튼
            ElevatedButton(
              child: Text("로그인", style: TextStyle(fontSize: 21)),
              onPressed: () {
                // 로그인 성공시 HomePage로 이동
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (_) => App()),
                );
              },
            ),

            /// 회원가입 버튼
            Container(
              child: ElevatedButton(
                child: Text("회원가입", style: TextStyle(fontSize: 21)),
                onPressed: () {
                  // 회원가입
                  print("sign up");
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => SignUp()), // 이동하려는 페이지
                  );
                },
              ),
            ),
            GestureDetector(
              onTap: () {
                print('Textbutton 2');
              },
              child: Container(
                child: Image.asset(
                  'assets/images/naver_logo.png',
                  width: 300,
                  height: 50,
                ),
              ),
            ),
            SizedBox(height: 6),

            GestureDetector(
              onTap: () {
                print('Textbutton 1');
              },
              child: Container(
                child: Image.asset(
                  'assets/images/kakao_login.png',
                  width: 200,
                  height: 50,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class SignUp extends StatefulWidget {
  const SignUp({super.key});

  @override
  State<SignUp> createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Dietgram")),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            SizedBox(height: 32),

            /// 이메일
            TextField(
              controller: emailController,
              decoration: InputDecoration(hintText: " 회원 가입할 이메일"),
            ),

            /// 비밀번호
            TextField(
              controller: passwordController,
              obscureText: false, // 비밀번호 안보이게
              decoration: InputDecoration(hintText: "비밀번호"),
            ),
            SizedBox(height: 32),

            /// 로그인 버튼
            ElevatedButton(
              child: Text("회원가입", style: TextStyle(fontSize: 21)),
              onPressed: () {
                // 로그인 성공시 HomePage로 이동
                print("회원가입 처리~~~");
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (_) => LoginPage()),
                );
              },
            ),
            SizedBox(height: 6),
          ],
        ),
      ),
    );
  }
}
