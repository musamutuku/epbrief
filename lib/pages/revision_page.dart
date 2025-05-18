import 'package:flutter/material.dart';
import '../data/revision_questions.dart';

class RevisionPage extends StatefulWidget {
  @override
  _RevisionPageState createState() => _RevisionPageState();
}

class _RevisionPageState extends State<RevisionPage> {
  String query = '';

  @override
  Widget build(BuildContext context) {
    var filtered = questions.where((q) => q.toLowerCase().contains(query.toLowerCase())).toList();

    return Scaffold(
      appBar: AppBar(title: Text('Revision Questions')),
      body: Column(
        children: [
          Padding(
            padding: EdgeInsets.all(8),
            child: TextField(
              onChanged: (val) => setState(() => query = val),
              decoration: InputDecoration(
                hintText: 'Search questions...',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.search),
              ),
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: filtered.length,
              itemBuilder: (context, index) {
                return ListTile(title: Text(filtered[index]));
              },
            ),
          )
        ],
      ),
    );
  }
}
