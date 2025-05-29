import React, { useState, createContext, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, useColorScheme, TextInput, Switch, StyleSheet, Alert } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// === Contexts ===
const ThemeContext = createContext();
const BookmarkContext = createContext();

// === Sample Data ===
const notes = [
  {
    chapter: '1: Introduction to Entrepreneurship',
    subtopics: [
      {
        title: 'Definition of Entrepreneurship',
        content: 'Entrepreneurship is identifying a business opportunity, gathering resources, and taking calculated risks to establish a profit-making venture.'
      },
      {
        title: 'Difference between Self and Salaried Employment',
        content: "Self-employment involves starting and running one's own business. Salaried employment involves working for someone else and receiving a steady income."
      },
      {
        title: 'Contribution of Entrepreneurship to National Development',
        content: 'It includes job creation, wealth generation, use of local resources, and stimulating innovation and economic growth.'
      }
    ]
  },
  {
    chapter: '2: Evolution of Entrepreneurship',
    subtopics: [
      {
        title: 'History of Entrepreneurship',
        content: 'From early economists like Cantillon to the rise of SMEs, entrepreneurship has evolved to drive global economic growth.'
      },
      {
        title: 'Myths of Entrepreneurship',
        content: 'Common myths include the need for large capital, experience, or innovation at startup; many successful entrepreneurs began with little of these.'
      },
      {
        title: 'Theories of Entrepreneurship',
        content: 'Includes economic, psychological, and sociological theories, explaining entrepreneurship as influenced by environment, traits, and innovation.'
      }
    ]
  },
  {
    chapter: '3: The Entrepreneur',
    subtopics: [
      {
        title: 'Types of Entrepreneurs',
        content: 'Includes craft, opportunistic, egoistic, innovative, imitative, Fabian, drone, and lifestyle entrepreneurs, each with unique traits.'
      },
      {
        title: 'Qualities of an Entrepreneur',
        content: 'Successful entrepreneurs are risk-takers, innovative, persistent, time-conscious, resourceful, and have strong leadership and organizational skills.'
      },
      {
        title: 'Roles of an Entrepreneur',
        content: 'They initiate, manage, finance, and oversee all aspects of business operations and planning.'
      }
    ]
  },
  {
    chapter: '4: Creativity and Innovation',
    subtopics: [
      {
        title: 'Definitions and Process',
        content: 'Creativity is bringing new ideas into existence; innovation is applying these ideas to improve or create value.'
      },
      {
        title: 'Importance of Creativity and Innovation',
        content: 'Leads to productivity, profit maximization, diversification, and improved competitiveness.'
      },
      {
        title: 'Barriers and Management',
        content: 'Barriers include negative attitudes and fear of failure; managed through R&D, training, and promoting divergent thinking.'
      }
    ]
  },
  {
    chapter: '5: Entrepreneurial Culture',
    subtopics: [
      {
        title: 'Definition and Elements',
        content: 'A shared value system promoting innovation, independence, risk-taking, and future orientation.'
      },
      {
        title: 'Factors Promoting Culture',
        content: 'Include independence, risk-taking, honesty, personal involvement, time management, and trust.'
      },
      {
        title: 'Factors Inhibiting Culture',
        content: 'Cultural barriers, lack of training, poor marketing, resistance to change, and ineffective delegation.'
      }
    ]
  },
  {
    chapter: '6: Entrepreneurial Opportunities',
    subtopics: [
      {
        title: 'Meaning and Characteristics',
        content: 'Opportunities are viable business ideas that address unmet needs with good ROI and marketability.'
      },
      {
        title: 'Generating Business Ideas',
        content: 'Through hobbies, skills, market research, brainstorming, observation, and complaints.'
      },
      {
        title: 'Evaluating Viability',
        content: 'Assess based on personal goals, market size, competition, skills, environment, and feasibility.'
      }
    ]
  }
];


const quizzes = {
  'Chapter 1: Introduction': [
    {
      question: 'What is entrepreneurship?',
      options: ['A job', 'A process of risk-taking', 'A government program', 'A product'],
      answer: 1
    },
    {
      question: 'Why is entrepreneurship important?',
      options: ['For fun', 'It creates employment and drives innovation', 'To waste time', 'No reason'],
      answer: 1
    }
  ],
  'Chapter 2: Business Planning': [
    {
      question: 'Which is part of a business plan?',
      options: ['Holiday plans', 'Shopping list', 'Executive summary', 'Blueprint'],
      answer: 2
    },
    {
      question: 'What does a good business plan include?',
      options: ['Nothing', 'Marketing only', 'Operations only', 'Exec summary, marketing, operations, and financials'],
      answer: 3
    }
  ]
};


// === Home / Notes Screen ===
function HomeScreen() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState({});
  const { bookmarks, setBookmarks } = useContext(BookmarkContext);
  const theme = useContext(ThemeContext);
  const isDark = theme.isDark;

 const filteredNotes = notes.map(chapter => ({
  ...chapter,
  subtopics: chapter.subtopics.filter(sub =>
    sub.title.toLowerCase().includes(search.toLowerCase()) ||
    sub.content.toLowerCase().includes(search.toLowerCase())
  )
})).filter(chap => chap.subtopics.length > 0);

  const toggleBookmark = (subtopic) => {
    const entry = `${subtopic.title}|||${subtopic.content}`;
    setBookmarks(prev =>
      prev.find(b => b === entry) ? prev.filter(b => b !== entry) : [...prev, entry]
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#fff', padding: 10 }}>
      <TextInput
        style={{
          backgroundColor: isDark ? '#333' : '#eee',
          padding: 10,
          borderRadius: 8,
          color: isDark ? '#fff' : '#000',
          marginBottom: 10,
          fontSize: 18
        }}
        placeholder="Search topics..."
        placeholderTextColor={isDark ? '#aaa' : '#555'}
        value={search}
        onChangeText={setSearch}
      />
      {filteredNotes.map((chapter, i) => (
        <View key={i} style={{ marginBottom: 15 }}>
          <TouchableOpacity onPress={() =>
            setExpanded(prev => ({ ...prev, [chapter.chapter]: !prev[chapter.chapter] }))
          }>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1E90FF' }}>
  		{expanded[chapter.chapter] ? '▼' : '▶'} {chapter.chapter}
	   </Text>


          </TouchableOpacity>
          {expanded[chapter.chapter] && chapter.subtopics.map((sub, j) => (
            <View key={j} style={{ marginLeft: 10, marginTop: 8, backgroundColor: isDark ? '#222' : '#f9f9f9', borderRadius: 6, padding: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: isDark ? '#fff' : '#000' }}>{sub.title}</Text>
              <Text style={{ marginVertical: 5, fontSize: 17, color: isDark ? '#ccc' : '#333' }}>{sub.content}</Text>
              <TouchableOpacity onPress={() => toggleBookmark(sub)}>
                <Text style={{ fontSize: 16, color: '#28a745' }}>
                  {bookmarks.includes(`${sub.title}|||${sub.content}`) ? 'Remove Bookmark' : 'Bookmark'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

// === Quiz Screen ===
function QuizScreen() {
  const [chapter, setChapter] = useState('Chapter 1: Introduction');
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const theme = useContext(ThemeContext);
  const isDark = theme.isDark;
  const current = quizzes[chapter][index];

  const checkAnswer = () => {
    if (selected === current.answer) setScore(score + 1);
    if (index + 1 < quizzes[chapter].length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const retryQuiz = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#fff', padding: 20 }}>
      <ScrollView horizontal style={{ marginBottom: 20 }}>
        {Object.keys(quizzes).map((chap, i) => (
          <TouchableOpacity key={i} onPress={() => { setChapter(chap); retryQuiz(); }}
            style={{
              backgroundColor: chapter === chap ? '#007bff' : (isDark ? '#333' : '#ccc'),
              padding: 10, borderRadius: 6, marginRight: 10
            }}>
            <Text style={{ color: chapter === chap ? '#fff' : (isDark ? '#fff' : '#000') }}>{chap}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {showResult ? (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, color: isDark ? '#fff' : '#000' }}>Score: {score} / {quizzes[chapter].length}</Text>
          <TouchableOpacity onPress={retryQuiz}
            style={{ backgroundColor: '#007bff', padding: 10, borderRadius: 6, marginTop: 20 }}>
            <Text style={{ color: '#fff' }}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={{ fontSize: 18, color: isDark ? '#fff' : '#000' }}>{current.question}</Text>
          {current.options.map((opt, i) => (
            <TouchableOpacity key={i} onPress={() => setSelected(i)}
              style={{
                backgroundColor: selected === i ? '#007bff' : (isDark ? '#333' : '#eee'),
                padding: 10, borderRadius: 6, marginTop: 10
              }}>
              <Text style={{ color: selected === i ? '#fff' : (isDark ? '#fff' : '#000') }}>{opt}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
  		onPress={checkAnswer}
  		 disabled={selected === null}
  		 style={{
  		  backgroundColor: selected === null ? '#94d3a2' : '#28a745',
    		  padding: 10,
  	         borderRadius: 6,
 	        marginTop: 20,
   	      opacity: selected === null ? 0.6 : 1
  	    }}>
 	   <Text style={{ color: '#fff', textAlign: 'center' }}>Next</Text>
	  </TouchableOpacity>

        </>
      )}
    </View>
  );
}

// === Bookmarks Screen ===
function BookmarksScreen() {
  const { bookmarks, setBookmarks } = useContext(BookmarkContext);
  const theme = useContext(ThemeContext);
  const isDark = theme.isDark;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#fff', padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: isDark ? '#fff' : '#000' }}>Bookmarked Topics</Text>
      {bookmarks.length === 0 ? (
        <Text style={{ color: isDark ? '#ccc' : '#555', fontSize: 17 }}>No bookmarks yet.</Text>
      ) : (
        bookmarks.map((entry, i) => {
          const [title, content] = entry.split('|||');
          return (
            <View key={i} style={{ backgroundColor: isDark ? '#222' : '#eee', padding: 10, borderRadius: 6, marginBottom: 8 }}>
              <Text style={{ color: isDark ? '#fff' : '#000', fontWeight: 'bold', fontSize: 17 }}>{title}</Text>
              <Text style={{ color: isDark ? '#ccc' : '#333', fontSize: 16 }}>{content}</Text>
              <TouchableOpacity onPress={() => setBookmarks(prev => prev.filter(t => t !== entry))}>
                <Text style={{ color: '#dc3545', fontSize: 16 }}>Remove</Text>
              </TouchableOpacity>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

// === Settings Screen ===
function SettingsScreen() {
  const theme = useContext(ThemeContext);
  const isDark = theme.isDark;
  return (
 <View style={[styles.center, { alignItems: 'flex-start', backgroundColor: isDark ? '#121212' : '#fff', padding: 20 }]}>
  <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2, color: isDark ? '#aaa' : '#333' }}>About App:</Text>
  <Text style={{ fontSize: 16, marginBottom: 10, color: isDark ? '#aaa' : '#333' }}>EpBrief helps in entrepreneurship revision</Text>

  <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2, color: isDark ? '#aaa' : '#333' }}>Contact:</Text>
  <Text style={{ fontSize: 16, marginBottom: 10, color: isDark ? '#aaa' : '#333' }}>+254799144429</Text>

  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
    <Text style={{ fontSize: 16, fontWeight: 'bold', marginRight: 15, color: isDark ? '#fff' : '#000' }}>Dark Mode</Text>
    <Switch value={isDark} onValueChange={theme.toggleTheme} style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }} />
  </View>
</View>


  );
}

// === App Wrapper ===
const Tab = createBottomTabNavigator();

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <BookmarkContext.Provider value={{ bookmarks, setBookmarks }}>
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let icon;
                if (route.name === 'Home') icon = 'book';
                else if (route.name === 'Quiz') icon = 'help-circle';
                else if (route.name === 'Bookmarks') icon = 'bookmark';
                else if (route.name === 'Settings') icon = 'settings';
                return <Ionicons name={icon} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Quiz" component={QuizScreen} />
            <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </BookmarkContext.Provider>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20
  }
});
