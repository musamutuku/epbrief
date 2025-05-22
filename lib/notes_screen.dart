import 'package:flutter/material.dart';

class NotesScreen extends StatefulWidget {
  final Function(String) onBookmarkToggle;
  final bool Function(String) isBookmarked;

  NotesScreen({required this.onBookmarkToggle, required this.isBookmarked});

  @override
  _NotesScreenState createState() => _NotesScreenState();
}

class _NotesScreenState extends State<NotesScreen> {
  final List<Map<String, dynamic>> topics = [
    {
      'title': 'Introduction to Entrepreneurship',
      'points': [
        'Definition',
        'Key Concepts',
        'Characteristics',
        'Importance',
        'Types',
        'Myths',
        'Entrepreneur vs Manager'
      ]
    },
    {
      'title': 'Business Plan',
      'points': ['Definition', 'Key components', 'Benefits']
    },
    {
      'title': 'Market Research',
      'points': ['Definition', 'Methods', 'Analysis']
    },
    {
      'title': 'Capital',
      'points': ['Sources of capital', 'Bootstrapping']
    },
    {
      'title': 'Innovation',
      'points': ['Types', 'Strategies']
    },
    {
      'title': 'Risks',
      'points': ['Types', 'Management']
    },
  ];

  String _searchQuery = '';

  @override
  Widget build(BuildContext context) {
    final filteredTopics = topics
        .where((topic) => topic['title'].toLowerCase().contains(_searchQuery.toLowerCase()))
        .toList();

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: TextField(
            decoration: InputDecoration(
              hintText: 'Search topics...',
              prefixIcon: Icon(Icons.search),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8.0)),
            ),
            onChanged: (value) {
              setState(() {
                _searchQuery = value;
              });
            },
          ),
        ),
        Expanded(
          child: ListView.builder(
            itemCount: filteredTopics.length,
            itemBuilder: (context, index) {
              final title = filteredTopics[index]['title'];
              return Card(
                margin: EdgeInsets.all(10),
                child: ListTile(
                  title: Text(title),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: List.generate(
                      filteredTopics[index]['points'].length,
                      (i) => Text('\u2022 ' + filteredTopics[index]['points'][i]),
                    ),
                  ),
                  trailing: IconButton(
                    icon: Icon(
                      widget.isBookmarked(title) ? Icons.bookmark : Icons.bookmark_border,
                      color: widget.isBookmarked(title) ? Colors.indigo : null,
                    ),
                    onPressed: () => widget.onBookmarkToggle(title),
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
