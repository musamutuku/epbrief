import 'package:flutter/material.dart';
import 'pages/home_page.dart';

void main() {
  runApp(EntrepreneurshipApp());
}

class EntrepreneurshipApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Entrepreneurship Revision',
      theme: ThemeData(primarySwatch: Colors.teal),
      home: HomePage(),
    );
  }
}
