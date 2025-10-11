export function createWelcomeEmailTemplate(name, clientURL) {
  return `
    <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div
      style="
        width: 100%;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f5f5f5;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      "
    >
      <div
        style="
          background: linear-gradient(to right, #36d1d6, #5b86e5);
          padding: 30px;
          text-align: center;
          border-radius: 12px 12px 0 0;
        "
      >
        <img
          src=""
          alt=""
          style="
            background-color: white;
            padding: 10px;
            height: 80px;
            width: 80px;
            border-radius: 50%;
            margin-bottom: 20px;
          "
        />

        <h1 style="color: white; margin: 0; font-size: 25px; font-weight: 500">
          Welcome to Messenger!
        </h1>
      </div>

      <div>
        <div>
          <h2 style="color: #36d1d6; ">Hello ${name},</h1>

          <p>
            We're excited to have you join our messaging platform! Messenger
            connects you with friends, family, and colleagues in real-time, no
            matter where they are
          </p>

          <div
            style="
              background-color: #f8f9fa;
              padding: 25px;
              margin: 25px 0;
              border-radius: 10px;
              border-left: 4px solid #36d1dc;
            "
          >
            <p style="font-size: 18px; font-weight: bold; margin-bottom: 10px">
              Get started in just a few steps:
            </p>
            <ul style="padding-left: 20px; margin: 0">
              <li style="margin: 5px 0">Set up your profile pricture</li>
              <li style="margin: 5px 0">Find and add your contacts</li>
              <li style="margin: 5px 0">Start a conversation</li>
              <li style="margin: 5px 0">Share photos, videos, and more</li>
            </ul>
          </div>

          <div style="display: flex; justify-content: center; align-items: center;">
            <a href=${clientURL}
                style="
                padding: 15px 30px;
                background: linear-gradient(to right, #36d1d6, #5b86e5);
                color: white;
                border-radius: 50px;
                align-items: center;
                border: 1px solid #5b86e5;
                font-size: 15px;
                "
            >
                Open Messenger
          </a>
          </div>

          
          <p style="margin: 10px 0">
            If you need any help or have questions, we're always here to assist
            you.
          </p>
          <p>Happy messaging!</p>
          <p>Best regards,</p>
        </div>
      </div>
    </div>
  </body>
</html>
    `;
}
