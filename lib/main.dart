import 'package:flutter/material.dart';
import 'notes_screen.dart';
import 'quiz_screen.dart';


void main() {
  runApp(SmartPreneurApp());
}

class SmartPreneurApp extends StatefulWidget {
  @override
  _SmartPreneurAppState createState() => _SmartPreneurAppState();
}

class _SmartPreneurAppState extends State<SmartPreneurApp> {
  ThemeMode _themeMode = ThemeMode.light;

  void _toggleTheme(bool isDark) {
    setState(() {
      _themeMode = isDark ? ThemeMode.dark : ThemeMode.light;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'EpBrief',
      theme: ThemeData(primarySwatch: Colors.indigo),
      darkTheme: ThemeData.dark(),
      themeMode: _themeMode,
      home: HomeScreen(toggleTheme: _toggleTheme),
    );
  }
}

class HomeScreen extends StatefulWidget {
  final Function(bool) toggleTheme;
  HomeScreen({required this.toggleTheme});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;
  final Set<String> _bookmarkedTitles = {};

  final List<Widget> _screens = [];

  @override
  void initState() {
    super.initState();
    _screens.addAll([
      NotesScreen(onBookmarkToggle: _toggleBookmark, isBookmarked: _isBookmarked),
      QuizScreen(),
      BookmarksScreen(getBookmarks: () => _bookmarkedTitles),
      SettingsScreen(toggleTheme: widget.toggleTheme),
    ]);
  }

  void _toggleBookmark(String title) {
    setState(() {
      if (_bookmarkedTitles.contains(title)) {
        _bookmarkedTitles.remove(title);
      } else {
        _bookmarkedTitles.add(title);
      }
    });
  }

  bool _isBookmarked(String title) => _bookmarkedTitles.contains(title);

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
    Navigator.pop(context); // Close drawer on tap
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('EpBrief')),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: BoxDecoration(color: Colors.indigo),
              child: Text('EpBrief', style: TextStyle(color: Colors.white, fontSize: 24)),
            ),
            ListTile(
              leading: Icon(Icons.home),
              title: Text('Home'),
              onTap: () => _onItemTapped(0),
            ),
            ListTile(
              leading: Icon(Icons.quiz),
              title: Text('Quizzes'),
              onTap: () => _onItemTapped(1),
            ),
            ListTile(
              leading: Icon(Icons.bookmark),
              title: Text('Bookmarks'),
              onTap: () => _onItemTapped(2),
            ),
            ListTile(
              leading: Icon(Icons.settings),
              title: Text('Settings'),
              onTap: () => _onItemTapped(3),
            ),
          ],
        ),
      ),
      body: _screens[_selectedIndex],
    );
  }
}

class SettingsScreen extends StatefulWidget {
  final Function(bool) toggleTheme;
  SettingsScreen({required this.toggleTheme});

  @override
  _SettingsScreenState createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool _isDark = false;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: EdgeInsets.all(16),
      children: [
        SwitchListTile(
          title: Text("Dark Mode"),
          value: _isDark,
          onChanged: (val) {
            setState(() => _isDark = val);
            widget.toggleTheme(val);
          },
        ),
        Divider(),
        ListTile(
          title: Text("About EpBrief"),
          subtitle: Text("An app to help you revise entrepreneurship notes and test yourself with quizzes."),
        ),
        Divider(),
        ListTile(
          title: Text("Contact"),
          subtitle: Text("Email: support@epbrief.com\nPhone: +254 712 345 678"),
        )
      ],
    );
  }
}

class BookmarksScreen extends StatelessWidget {
  final Set<String> Function() getBookmarks;

  BookmarksScreen({required this.getBookmarks});

  @override
  Widget build(BuildContext context) {
    final bookmarks = getBookmarks().toList();

    return bookmarks.isEmpty
        ? Center(child: Text('No bookmarks yet.', style: TextStyle(fontSize: 18)))
        : ListView.builder(
            itemCount: bookmarks.length,
            itemBuilder: (context, index) => ListTile(
              leading: Icon(Icons.bookmark),
              title: Text(bookmarks[index]),
            ),
          );
  }
}
