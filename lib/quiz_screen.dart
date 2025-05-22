import 'package:flutter/material.dart';

class QuizScreen extends StatefulWidget {
  @override
  _QuizScreenState createState() => _QuizScreenState();
}

class _QuizScreenState extends State<QuizScreen> {
  final List<Map<String, dynamic>> _questions = [
    {
      'question': 'What is entrepreneurship?',
      'options': ['Owning a business', 'Starting a business', 'A mindset and process', 'Managing a company'],
      'answer': 2
    },
    {
      'question': 'Which is NOT a characteristic of an entrepreneur?',
      'options': ['Innovative', 'Risk-averse', 'Persistent', 'Visionary'],
      'answer': 1
    },
    {
      'question': 'What is a business plan?',
      'options': ['Marketing strategy', 'Loan application', 'Roadmap for the business', 'Sales report'],
      'answer': 2
    },
  ];

  int _currentQuestion = 0;
  int _score = 0;
  bool _quizFinished = false;

  void _answerQuestion(int selectedIndex) {
    if (selectedIndex == _questions[_currentQuestion]['answer']) {
      _score++;
    }
    if (_currentQuestion < _questions.length - 1) {
      setState(() => _currentQuestion++);
    } else {
      setState(() => _quizFinished = true);
    }
  }

  void _restartQuiz() {
    setState(() {
      _currentQuestion = 0;
      _score = 0;
      _quizFinished = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_quizFinished) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text("Quiz Completed!", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
            Text("Score: $_score / ${_questions.length}", style: TextStyle(fontSize: 18)),
            SizedBox(height: 20),
            ElevatedButton(onPressed: _restartQuiz, child: Text("Repeat Quiz")),
          ],
        ),
      );
    }

    final question = _questions[_currentQuestion];
    return ListView(
      padding: EdgeInsets.all(16),
      children: [
        Text("Question ${_currentQuestion + 1} of ${_questions.length}",
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500)),
        SizedBox(height: 10),
        Text(question['question'], style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        SizedBox(height: 20),
        ...List.generate(question['options'].length, (i) {
          return ElevatedButton(
            style: ElevatedButton.styleFrom(padding: EdgeInsets.symmetric(vertical: 12)),
            onPressed: () => _answerQuestion(i),
            child: Text(question['options'][i]),
          );
        }),
      ],
    );
  }
}
