export function getSimplifiedDescription(description) {
    let words = description.split(" ");
    // Remove words that are not necessary for the description
    let unnecessaryWords = ["Very", "Intensity", "Shower", "Freezing", "Ragged", "With"];
    words = words.filter(word => !unnecessaryWords.includes(word));
    // Take the last two words as the simplified description
    let simplifiedDescription = words.join(" ");
    //if word contains "And" make the And lowercase
    if (simplifiedDescription.includes("And")) {
        simplifiedDescription = simplifiedDescription.replace("And", "and");
    }
    return simplifiedDescription;
}

export function getRainIcon(rainData) {
    if (rainData < 10) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cloud-rain-fill weatherIcon rainIcon" viewBox="0 0 16 16">
                <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973z" />
            </svg>
        )
    }
    else {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cloud-rain-heavy-fill weatherIcon rainIcon" viewBox="0 0 16 16">
                <path d="M4.176 11.032a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm.229-7.005a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973z" />
            </svg>
        )
    }
}