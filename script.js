document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('guidance-form');
    const inputSection = document.getElementById('input-section');
    const resultsSection = document.getElementById('results-section');
    const backBtn = document.getElementById('back-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Gather data
        const formData = {
            branch: document.getElementById('branch').value,
            interests: document.getElementById('interests').value,
            availability: document.getElementById('availability').value,
            skillLevel: document.querySelector('input[name="skill-level"]:checked').value
        };

        generateRecommendations(formData);
        
        // Switch views with animation
        inputSection.style.opacity = '0';
        inputSection.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            inputSection.classList.remove('active');
            inputSection.style.display = 'none';
            
            resultsSection.style.display = 'block';
            // Trigger reflow
            void resultsSection.offsetWidth;
            
            resultsSection.classList.add('active');
        }, 400);
    });

    backBtn.addEventListener('click', () => {
        resultsSection.classList.remove('active');
        
        setTimeout(() => {
            resultsSection.style.display = 'none';
            
            inputSection.style.display = 'block';
            // Trigger reflow
            void inputSection.offsetWidth;
            
            inputSection.style.opacity = '1';
            inputSection.style.transform = 'translateY(0)';
            inputSection.classList.add('active');
        }, 400);
    });

    function generateRecommendations(data) {
        // Mock AI Logic based on keywords
        const interests = data.interests.toLowerCase();
        let skills = [];
        let roadmap = [];
        let courses = [];
        let plan = "";

        if (interests.includes('web') || interests.includes('frontend') || interests.includes('design')) {
            skills = ['HTML5 & CSS3', 'JavaScript (ES6+)', 'React.js', 'Tailwind CSS', 'UI/UX Basics'];
            roadmap = [
                { title: 'Foundations', desc: 'Master the basics of the web and how browsers work.' },
                { title: 'Frontend Logic', desc: 'Deep dive into JavaScript and DOM manipulation.' },
                { title: 'Modern Frameworks', desc: 'Learn React to build scalable applications.' },
                { title: 'Portfolio', desc: 'Build 3 major projects to showcase your skills.' }
            ];
            courses = [
                { name: 'MDN Web Docs', url: '#' },
                { name: 'freeCodeCamp Web Design', url: '#' },
                { name: 'React - The Complete Guide', url: '#' }
            ];
            plan = "Focus 2 hours daily on coding. Weekdays: Learn new concepts. Weekends: Build mini-projects. Start with a personal portfolio site.";
        } else if (interests.includes('data') || interests.includes('ai') || interests.includes('ml')) {
            skills = ['Python', 'Pandas & NumPy', 'SQL', 'Scikit-Learn', 'Data Visualization'];
            roadmap = [
                { title: 'Python Mastery', desc: 'Learn syntax, data structures, and scripting.' },
                { title: 'Data Analysis', desc: 'Learn to manipulate and clean datasets.' },
                { title: 'Machine Learning', desc: 'Understand algorithms and model training.' },
                { title: 'Real-world Ops', desc: 'Deploy models and work with big data tools.' }
            ];
            courses = [
                { name: 'CS50 Introduction to AI', url: '#' },
                { name: 'Kaggle Micro-Courses', url: '#' },
                { name: 'Fast.ai Deep Learning', url: '#' }
            ];
            plan = "Dedicate 1 hour to theory and 2 hours to practice daily. Participate in one Kaggle competition per month. Read research papers on weekends.";
        } else {
            // Default generic path
            skills = ['Problem Solving', 'Git & GitHub', 'Basic Programming', 'Communication', 'Time Management'];
            roadmap = [
                { title: 'Exploration', desc: 'Try different fields to find your passion.' },
                { title: 'Fundamentals', desc: 'Pick one language (Python/JS) and master it.' },
                { title: 'Building', desc: 'Create small tools to solve your own problems.' },
                { title: 'Networking', desc: 'Connect with others in tech communities.' }
            ];
            courses = [
                { name: 'CS50 Introduction to CS', url: '#' },
                { name: 'The Missing Semester', url: '#' },
                { name: 'Coursera Essentials', url: '#' }
            ];
            plan = "Spend time exploring different technologies. Allocate 30 mins daily to reading tech news and 1 hour to coding practice.";
        }

        // Populate UI
        const skillsList = document.getElementById('skills-list');
        skillsList.innerHTML = skills.map(s => `<li>${s}</li>`).join('');

        const roadmapContainer = document.getElementById('roadmap-container');
        roadmapContainer.innerHTML = roadmap.map((step, index) => `
            <div class="roadmap-step">
                <div class="step-number">${index + 1}</div>
                <div>
                    <h4>${step.title}</h4>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">${step.desc}</p>
                </div>
            </div>
        `).join('');

        const coursesList = document.getElementById('courses-list');
        coursesList.innerHTML = courses.map(c => `
            <li><a href="${c.url}" target="_blank">
                <span>📚</span> ${c.name}
            </a></li>
        `).join('');

        document.getElementById('study-plan').textContent = plan;
    }
});
