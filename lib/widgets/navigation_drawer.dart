import 'package:flutter/material.dart';
import '../pages/summary_page.dart';
import '../pages/revision_page.dart';

class NavigationDrawerWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: [
          DrawerHeader(
            child: Text("Menu", style: TextStyle(fontSize: 24, color: Colors.white)),
            decoration: BoxDecoration(color: Colors.teal),
          ),
          ListTile(
            title: Text('Summary'),
            onTap: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) => SummaryPage()));
            },
          ),
          ListTile(
            title: Text('Revision Questions'),
            onTap: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) => RevisionPage()));
            },
          ),
        ],
      ),
    );
  }
}
