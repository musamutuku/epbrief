import 'package:flutter/material.dart';
import '../data/summary_data.dart';

class SummaryPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Summary')),
      body: ListView.builder(
        itemCount: summary.length,
        itemBuilder: (context, index) {
          return ListTile(title: Text(summary[index]));
        },
      ),
    );
  }
}
