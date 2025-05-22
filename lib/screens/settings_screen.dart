import 'package:flutter/material.dart';

class SettingsScreen extends StatefulWidget {
  @override
  _SettingsScreenState createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool _isDarkMode = false;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: EdgeInsets.all(16),
      children: [
        SwitchListTile(
          title: Text("Dark Mode"),
          value: _isDarkMode,
          onChanged: (val) {
            setState(() {
              _isDarkMode = val;
            });
            // TODO: Implement theme switching
          },
        ),
        ListTile(
          title: Text("About EpBrief"),
          subtitle: Text("This app provides summarized entrepreneurship notes and quizzes."),
        ),
        ListTile(
          title: Text("Contact Developer"),
          subtitle: Text("Email: epbrief@app.dev\nPhone: +254 712 345 678"),
        ),
      ],
    );
  }
}
