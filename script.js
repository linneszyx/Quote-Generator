/* Assigning the elements in the HTML file to variables. */
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
/* Creating a new variable called apiQuotes and assigning it an empty array. */
let apiQuotes = [];
/**
 * When the page loads, the loader will be visible and the quote container will be hidden.
 */
function loadingLoader() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
/**
 * When the page loads, hide the loader and show the quote container.
 */
function loadingComplete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

/**
 * It's a function that generates a random quote from an array of quotes, and displays it on the
 * screen.
 */
function newQuote() {
    loadingLoader();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    if (!quote.author) {
        authorText.textContent = 'Unknown';
    }
    else {
        authorText.textContent = quote.author;
    }
    if (quote.text.length > 110) {
        quoteText.classList.add('long-quote');
    }
    else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    loadingComplete();
}

async function getQuote() {
    loadingLoader();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {

    }
}
/**
 * The function tweetQuotes() is called when the user clicks on the Twitter button. The function opens
 * a new window with the text of the quote and the author of the quote.
 */
function tweetQuotes() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} -  ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
/* Adding an event listener to the newQuoteBtn and twitterBtn. When the user clicks on the
newQuoteBtn, the newQuote function is called. When the user clicks on the twitterBtn, the
tweetQuotes function is called. */
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuotes);

/* Calling the getQuote function. */
getQuote();