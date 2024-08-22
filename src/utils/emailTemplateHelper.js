// src/utils/emailTemplateHelper.js

function generateEmailTemplate({ apiName, formData, currentLanguage }) {
  return `<html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 90%;
            max-width: 600px;
            margin: 20px 0; /* Center the container horizontally */
            padding: 20px;
            border: 1px solid #ddd;
            background: #f5f5f5;
            border-radius: 4px;
          }
          h1 {
            font-size: 18px;
            margin-bottom: 10px;
          }
          p {
            margin: 0 0 10px;
          }
          hr {
            border: 0;
            border-top: 1px solid #ddd;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Contact Form from ${apiName}</h1>
          <p>Name: ${formData.name}</p>
          <p>Email: ${formData.email}</p>
          <p>Message:</p>
          <p>${formData.message}</p>
          <hr />
          <p>This message was sent from the ${currentLanguage} version</p>
        </div>
      </body>
    </html>
  `;
}

module.exports = generateEmailTemplate;
