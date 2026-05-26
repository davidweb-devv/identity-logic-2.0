/**
 * PROJECT: Who Are You? // Identity Logic
 * METRICS: Impact (Influence) & Stability (Foundation)
 */

const decisionTree = {
    root: {
        question: "How do you start your morning?",
        subtext: "The first 15 minutes often dictate your cognitive load for the next 16 hours.",
        options: [
            { text: "Check My Phone or Social Media", next: "q2_distracted", stability: -5, impact: 2 },
            { text: "Do something intentional for myself first", next: "q2_focused", stability: 8, impact: 5 }
        ]
    },
    q2_distracted: {
        question: "How do you process the success of others?",
        subtext: "Social comparison is the fastest way to leak mental energy.",
        options: [
            { text: "I look for the strategy behind it", next: "q3_action", impact: 6, stability: 2 },
            { text: "I feel a sense of falling behind", next: "q3_stuck", stability: -8, impact: 1 }
        ]
    },
    q2_focused: {
        question: "What defines your current primary goal?",
        subtext: "A goal without a system is just a wish with a deadline.",
        options: [
            { text: "Consistent daily steps", next: "q3_action", impact: 8, stability: 10 },
            { text: "Waiting for a major breakthrough", next: "q3_stuck", impact: 5, stability: -4 }
        ]
    },
    q3_action: {
        question: "How do you handle social obligations vs. work?",
        subtext: "The ability to say 'no' determines the quality of your 'yes'.",
        options: [
            { text: "I prioritize social connection for now", next: "q4_balance", stability: 6, impact: 2 },
            { text: "I protect my time at all costs", next: "q4_grind", impact: 9, stability: 4 }
        ]
    },
    q3_stuck: {
        question: "What is your response to a major setback?",
        subtext: "Failure is data; how you decode it defines your resilience.",
        options: [
            { text: "Seek feedback and recalibrate", next: "q4_balance", stability: 8, impact: 6 },
            { text: "Internalize the failure and retreat", next: "q4_grind", stability: -10, impact: 0 }
        ]
    },
    q4_balance: {
        question: "What is your primary driver for work?",
        subtext: "Validation is temporary; mastery is permanent.",
        options: [
            { text: "To be liked and understood", next: "q5_social", stability: 2, impact: 4 },
            { text: "To satisfy personal curiosity", next: "q5_skill", impact: 10, stability: 7 }
        ]
    },
    q4_grind: {
        question: "How do you experience high-pressure environments?",
        subtext: "Pressure can either turn coal into diamonds or dust.",
        options: [
            { text: "It sharpens my focus", next: "q5_skill", impact: 10, stability: 5 },
            { text: "It wears down my mental health", next: "q5_social", stability: -12, impact: 4 }
        ]
    },
    q5_social: {
        question: "What is your relationship with 'The Future'?",
        subtext: "Are you building a bridge or waiting for a boat?",
        options: [
            { text: "Taking it one day at a time", next: "end", impact: 3, stability: 6 },
            { text: "Hoping it sorts itself out", next: "end", impact: -5, stability: -5 }
        ]
    },
    q5_skill: {
        question: "What happens after you reach a peak?",
        subtext: "Success is a dangerous place to stay for too long.",
        options: [
            { text: "Protect what I've built", next: "end", stability: 12, impact: 4 },
            { text: "Look for the next vertical", next: "end", impact: 12, stability: 5 }
        ]
    },
    end: { question: "Finalizing Results...", options: [] }
};

let stats = { impact: 0, stability: 0, steps: 0 };

function renderNode(nodeId) {
    const node = decisionTree[nodeId];
    const container = document.getElementById('logic-container');
    
    // Smooth Fade Transition
    container.style.opacity = 0;
    container.style.transform = "translateY(10px)";

    setTimeout(() => {
        if (nodeId === 'end') {
            container.innerHTML = `<h1 class="question" style="text-align:center; color: #444; font-style: italic;">Finalizing Results...</h1>`;
            container.style.opacity = 1;
            setTimeout(() => showAnalysis(), 2500); 
        } else {
            container.innerHTML = `
                <p class="node-id" style="margin-bottom: 2px;"> ${stats.steps + 1}/5</p>
                <p class="subtext" style="font-size: 10px; color: #444; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">${node.subtext}</p>
                <h1 class="question">${node.question}</h1>
                <div class="button-group" id="btn-group"></div>
            `;

            const btnGroup = document.getElementById('btn-group');
            node.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'logic-btn';
                btn.innerHTML = `<span style="font-size: 10px; color: #333; margin-right: 12px;">•</span> ${opt.text}`;
                btn.onclick = () => handleChoice(opt);
                btnGroup.appendChild(btn);
            });
            container.style.opacity = 1;
            container.style.transform = "translateY(0)";
        }
        updateTelemetry();
    }, 400); 
}

function handleChoice(option) {
    stats.impact += option.impact || 0;
    stats.stability += option.stability || 0;
    stats.steps += 1;
    renderNode(option.next);
}

function showAnalysis() {
    const container = document.getElementById('logic-container');
    let title, tag, desc;

    // Advanced Result Logic
    if (stats.impact >= 35 && stats.stability >= 20) {
        title = "The Kinetic Titan";
        tag = "High Impact • High Stability";
        desc = "You balance massive output with a rock-solid foundation. You move the world without breaking yourself. Your primary challenge is finding a mission large enough to match your capacity.";
    } else if (stats.impact >= 30 && stats.stability < 10) {
        title = "The Supernova";
        tag = "Peak Impact •  Fragile Base";
        desc = "You are capable of incredible brilliance, but you are burning out. You trade your long-term stability for short-term impact. You are effective, but you are brittle. You must simplify to survive.";
    } else if (stats.stability >= 30 && stats.impact < 15) {
        title = "The Fortress";
        tag = "High Stability • Low Impact";
        desc = "You are incredibly safe and well-defended. Nothing shakes you. However, you have stopped taking the risks required to leave a mark. You are a bunker in a world that needs a bridge.";
    } else if (stats.stability < 0) {
        title = "The Reactive Voyager";
        tag = "Chaotic Dominance • Zero Stability";
        desc = "You are currently being steered by your environment. Your phone and your peers are making your choices for you. It is time to reclaim your morning and rebuild your internal systems.";
    } else {
        title = "The Emerging Strategist";
        tag = "Balanced Growth • Transitional";
        desc = "You are in a period of evolution. You've identified the noise and are building a better path. You aren't at peak power yet, but your trajectory is mathematically sound.";
    }

    container.style.opacity = 0;
    setTimeout(() => {
        container.innerHTML = `
            <div style="text-align: center; padding: 10px;">
                <p class="node-id" style="color: #00ff41;"> Audit Complete</p>
                <p style="font-size: 9px; letter-spacing: 2px; color: #555; margin-bottom: 15px; text-transform: uppercase;">${tag}</p>
                <h1 class="question" style="font-style: italic; margin-bottom: 15px;">${title}</h1>
                <div style="width: 30px; height: 1px; background: #222; margin: 0 auto 20px auto;"></div>
                <p style="line-height: 1.8; color: #999; margin-bottom: 40px; font-size: 14px; text-align: left; font-family: sans-serif;">${desc}</p>
                <button class="logic-btn" onclick="resetApp()" style="width: 100%; border-radius: 50px; text-align: center; font-style: italic;">Start Again</button>
            </div>
        `;
        container.style.opacity = 1;
    }, 400);
}

function resetApp() {
    stats = { impact: 0, stability: 0, steps: 0 };
    renderNode('root');
}

function updateTelemetry() {
    // Ensure these match the IDs in your footer
    document.getElementById('lev-score').innerText = stats.impact;
    document.getElementById('risk-score').innerText = stats.stability;
    document.getElementById('step-count').innerText = stats.steps + "/5";
}

// Kick off the app
renderNode('root');
