export const COURSE = {
  id: 'ai-cert',
  title: 'AI & Machine Learning Fundamentals',
  price: 150000, // NGN
  duration: '70 modules, self-paced',
  level: 'Beginner to Intermediate',
  badge: 'New'
};

const moduleDefinitions = [
  { title: 'Introduction to AI & ML', description: 'History, concepts, and applications of AI.' },
  { title: 'Setting Up Your AI Environment', description: 'Installing Python, Jupyter, and essential libraries.' },
  { title: 'Python for Data Science: Part 1', description: 'Core Python concepts, data types, and control flow.' },
  { title: 'Python for Data Science: Part 2', description: 'Functions, classes, and modules for data work.' },
  { title: 'NumPy for Numerical Computing', description: 'Mastering arrays, broadcasting, and vectorization.' },
  { title: "Pandas for Data Manipulation", description: 'DataFrames, Series, data cleaning, and wrangling.' },
  { title: 'Matplotlib for Data Visualization', description: 'Creating static, animated, and interactive plots.' },
  { title: 'Seaborn for Statistical Plots', description: 'High-level interface for attractive statistical graphics.' },
  { title: 'Essential Mathematics for ML', description: 'Linear algebra, calculus, and probability concepts.' },
  { title: 'Introduction to Scikit-Learn', description: 'Unified API for machine learning models.' },
  { title: 'Supervised Learning: Regression', description: 'Linear Regression, model evaluation metrics (MSE, R2).' },
  { title: 'Advanced Regression Techniques', description: 'Polynomial, Ridge, and Lasso Regression.' },
  { title: 'Supervised Learning: Classification', description: 'Logistic Regression, performance metrics (Accuracy, Precision, Recall).' },
  { title: 'K-Nearest Neighbors (KNN)', description: 'Instance-based learning for classification and regression.' },
  { title: 'Support Vector Machines (SVM)', description: 'Maximum margin classifiers for complex data.' },
  { title: 'Decision Trees and Random Forests', description: 'Tree-based models for interpretability and power.' },
  { title: 'Gradient Boosting Machines', description: 'XGBoost, LightGBM, and CatBoost for high performance.' },
  { title: 'Model Evaluation and Selection', description: 'Cross-validation, hyperparameter tuning, and grid search.' },
  { title: 'Handling Imbalanced Data', description: 'Techniques like SMOTE and class weighting.' },
  { title: 'Feature Engineering and Selection', description: 'Creating and selecting the most impactful features.' },
  { title: 'Unsupervised Learning Fundamentals', description: 'Discovering patterns in unlabeled data.' },
  { title: 'K-Means Clustering', description: 'Partitioning data into k clusters.' },
  { title: 'Hierarchical Clustering', description: 'Agglomerative and divisive clustering methods.' },
  { title: 'DBSCAN and Other Clustering Methods', description: 'Density-based clustering for noisy data.' },
  { title: 'Principal Component Analysis (PCA)', description: 'Dimensionality reduction for visualization and efficiency.' },
  { title: 't-SNE for Visualization', description: 'Visualizing high-dimensional data in 2D or 3D.' },
  { title: 'Association Rule Mining', description: 'Apriori algorithm for market basket analysis.' },
  { title: 'Introduction to Neural Networks', description: 'Perceptrons, activation functions, and backpropagation.' },
  { title: 'Building a Neural Network from Scratch', description: 'Implementing a simple NN in Python.' },
  { title: 'Introduction to TensorFlow 2.x', description: 'Core concepts, tensors, and automatic differentiation.' },
  { title: 'Introduction to PyTorch', description: 'Tensors, autograd, and building models with nn.Module.' },
  { title: "Deep Learning with Keras & TensorFlow", description: 'Sequential and Functional APIs for rapid prototyping.' },
  { title: 'Optimizers and Learning Rate Schedulers', description: 'Adam, RMSprop, and techniques for better training.' },
  { title: 'Regularization in Deep Learning', description: 'Dropout, L1/L2 regularization to prevent overfitting.' },
  { title: 'Convolutional Neural Networks (CNNs)', description: 'Image recognition, filters, and pooling layers.' },
  { title: 'Advanced CNN Architectures', description: 'ResNet, Inception, and EfficientNet.' },
  { title: 'Transfer Learning for Computer Vision', description: 'Using pre-trained models like VGG16 and MobileNet.' },
  { title: 'Recurrent Neural Networks (RNNs)', description: 'Processing sequential data, understanding hidden states.' },
  { title: 'LSTMs and GRUs', description: 'Solving the vanishing gradient problem in RNNs.' },
  { title: 'Introduction to Autoencoders', description: 'Unsupervised learning for feature extraction and generation.' },
  { title: 'Fundamentals of NLP', description: 'Text processing, tokenization, and stemming.' },
  { title: 'Text Representation: Bag-of-Words & TF-IDF', description: 'Converting text into numerical vectors.' },
  { title: 'Word Embeddings: Word2Vec & GloVe', description: 'Capturing semantic meaning of words.' },
  { title: 'Sentiment Analysis Project', description: 'Classifying text as positive, negative, or neutral.' },
  { title: 'Named Entity Recognition (NER)', description: 'Identifying names, places, and organizations in text.' },
  { title: 'Topic Modeling with LDA', description: 'Discovering hidden topics in a collection of documents.' },
  { title: 'Introduction to Transformers', description: 'Attention mechanism, BERT, and GPT architecture.' },
  { title: 'Fine-tuning Transformer Models', description: 'Using Hugging Face for custom NLP tasks.' },
  { title: 'Building a Text Summarizer', description: 'Extractive and abstractive summarization techniques.' },
  { title: 'Building a Chatbot with Rasa/Dialogflow', description: 'Conversational AI fundamentals.' },
  { title: 'Reinforcement Learning: Part 1', description: 'Core concepts, Markov Decision Processes, Q-Learning.' },
  { title: 'Reinforcement Learning: Part 2', description: 'Deep Q-Networks (DQN) and Policy Gradients.' },
  { title: 'Generative Adversarial Networks (GANs)', description: 'Generating realistic images and data.' },
  { title: 'Time Series Analysis and Forecasting', description: 'ARIMA, LSTMs for predicting future values.' },
  { title: 'Recommender Systems', description: 'Collaborative filtering and content-based filtering.' },
  { title: 'AI Ethics and Bias', description: 'Fairness, accountability, and transparency in AI.' },
  { title: 'Model Interpretability (XAI)', description: 'SHAP and LIME for explaining model predictions.' },
  { title: 'Introduction to MLOps', description: 'Lifecycle of a machine learning project in production.' },
  { title: 'Serving Models with Flask & FastAPI', description: 'Creating REST APIs for your ML models.' },
  { title: 'Containerization with Docker', description: 'Packaging your application and dependencies.' },
  { title: 'Deploying to Cloud Services (AWS/GCP/Azure)', description: 'Using services like SageMaker, AI Platform, or Azure ML.' },
  { title: 'CI/CD for Machine Learning', description: 'Automating testing and deployment with GitHub Actions.' },
  { title: 'Model Monitoring and Maintenance', description: 'Tracking model performance and data drift.' },
  { title: 'Capstone Project 1: Predictive Analytics', description: 'End-to-end regression or classification project.' },
  { title: 'Capstone Project 2: NLP Application', description: 'Build and deploy a sentiment analyzer or chatbot.' },
  { title: 'Capstone Project 3: Computer Vision App', description: 'Create an image classifier or object detector.' },
  { title: 'Preparing for AI/ML Interviews', description: 'Common questions, portfolio review, and career advice.' },
];

export const MODULES = moduleDefinitions.map((item, index) => ({
  id: String(index + 1).padStart(2, '0'),
  icon: String(index + 1).padStart(2, '0'),
  title: item.title,
  description: item.description,
  badge: index === 0 ? 'Free preview' : 'Core module',
  locked: index !== 0,
  videoId: index === 0 ? 'SaaYu_g-H-k' : '', // Example video
  duration: `${20 + (index % 5) * 3} min`,
  content: item.description,
}));

export const getModules = (user) => {
  const paid = user?.aiCoursePaid; // This will need to be added to AuthContext
  return MODULES.map(module => ({
    ...module,
    locked: paid ? false : module.locked
  }));
};

export const AI_CONCEPTS = [
    ['Supervised Learning', 'Learning from labeled data to make predictions.'],
    ['Unsupervised Learning', 'Finding patterns in unlabeled data.'],
    ['Reinforcement Learning', 'Learning through trial and error (rewards/penalties).'],
    ['Neural Networks', 'Brain-inspired models for complex pattern recognition.'],
    ['Natural Language Processing', 'Enabling computers to understand human language.'],
];

export const OUTCOMES = [
  'Master Python for data science, including NumPy, Pandas, and Matplotlib.',
  'Build, train, and evaluate a wide range of machine learning models with Scikit-Learn.',
  'Implement deep learning models for image and text data using TensorFlow and PyTorch.',
  'Deploy machine learning models into production using Docker and cloud services.',
  'Develop a professional portfolio with multiple end-to-end AI projects.'
];

export const INSTRUCTOR = {
  name: 'Dr. David Chen',
  role: 'AI Researcher & Data Scientist',
  students: '1,200+ trained',
  rating: 4.9,
  avatar: 'https://res.cloudinary.com/dufcon4jl/image/upload/v1776690565/herosection_zoojoq.png', // Placeholder
  bio: 'Dr. Chen is a leading AI researcher with a passion for making complex topics accessible. He has published several papers and consulted for top tech companies.'
};

export const TESTIMONIALS = [
  {
    quote: 'This course demystified AI for me. The Python labs were fantastic!',
    author: 'Bisi Adekunle, Software Developer',
    rating: 5
  },
  {
    quote: 'I was able to build my first predictive model within weeks. Highly recommended.',
    author: 'Ken Obinna, Product Manager',
    rating: 5
  }
];

export const FAQS = [
  {
    q: 'Do I need a powerful computer?',
    a: 'Not necessarily. We will use cloud-based tools like Google Colab for heavy computations, which you can access from any standard laptop.'
  },
  {
    q: 'Is this course heavy on math?',
    a: 'We focus on the practical application of AI. While we cover the essential concepts, advanced mathematics is not a prerequisite.'
  },
  {
    q: 'Will I get a certificate?',
    a: 'Yes, upon successful completion of all modules and the final project, you will receive a verifiable certificate from IFYWIGATECHZ Academy.'
  }
];