import 'package:flutter/material.dart';

class QuizScreen extends StatefulWidget {
  @override
  _QuizScreenState createState() => _QuizScreenState();
}

class _QuizScreenState extends State<QuizScreen> {
  final List<Map<String, Object>> _questions = [
    {
      'question': 'What is the first step in starting a business?',
      'options': ['Marketing', 'Idea generation', 'Hiring staff', 'Selling'],
      'answer': 'Idea generation'
    },
    {
      'question': 'What document outlines business goals and strategies?',
      'options': ['Invoice', 'Budget', 'Business Plan', 'Resume'],
      'answer': 'Business Plan'
    }
  ];

  int _currentIndex = 0;
  int _score = 0;

  void _nextQuestion(String selected) {
    if (selected == _questions[_currentIndex]['answer']) {
      _score++;
    }
    setState(() {
      _currentIndex++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Quiz')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: _currentIndex < _questions.length
            ? _buildQuestion()
            : _buildResult(),
      ),
    );
  }

  Widget _buildQuestion() {
    var question = _questions[_currentIndex];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          question['question'] as String,
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 20),
        ...(question['options'] as List<String>).map((option) => ListTile(
              title: Text(option),
              leading: Icon(Icons.circle_outlined),
              onTap: () => _nextQuestion(option),
            )),
      ],
    );
  }

  Widget _buildResult() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text('Quiz Completed!', style: TextStyle(fontSize: 22)),
          SizedBox(height: 10),
          Text('Your Score: $_score/${_questions.length}', style: TextStyle(fontSize: 18)),
          SizedBox(height: 20),
          ElevatedButton(
            onPressed: () {
              setState(() {
                _currentIndex = 0;
                _score = 0;
              });
            },
            child: Text('Retry'),
          )
        ],
      ),
    );
  }
}
