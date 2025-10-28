async function getToken() {
  try {
      const response = await fetch('https://dev-0o2a64jccu2dayz1.us.auth0.com/oauth/token', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          "client_id":"PCbYkLUapRH5rxGe8xcLfMCc7Uw5ukbJ",
          "client_secret":"LPupdOubIwFNRBzD_9TwVBUh-1wxCLNqeLQrqXcFyfJ18GlxbE88lOuyURca4DNs",
          "audience":"https://cse-341-notes-api.onrender.com",
          "grant_type":"client_credentials"
        }),
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
  } catch (error) {
      console.error('Error fetching token:', error);
  }
};

module.exports = {
  getToken,
};