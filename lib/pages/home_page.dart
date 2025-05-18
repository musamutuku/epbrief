import 'package:flutter/material.dart';
import 'summary_page.dart';
import 'revision_page.dart';
import '../widgets/navigation_drawer.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Entrepreneurship Revision')),
      drawer: NavigationDrawerWidget(),
      body: Center(child: Text("Welcome! Choose from the menu.")),
    );
  }
}
