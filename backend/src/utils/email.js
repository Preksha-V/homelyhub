import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

export const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // Configure Mailgen
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'HomelyHub',
      link: 'http://localhost:5173'
    }
  });

  // Generate email body
  const emailBody = mailGenerator.generate(options.mailgenContent);

  // Email options
  const mailOptions = {
    from: `HomelyHub <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    html: emailBody
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

// Send booking confirmation email
export const sendBookingConfirmation = async (user, booking, property) => {
  const mailgenContent = {
    body: {
      name: user.name,
      intro: 'Your booking has been confirmed!',
      table: {
        data: [
          {
            item: 'Property',
            description: property.propertyName
          },
          {
            item: 'Check-in',
            description: new Date(booking.fromDate).toDateString()
          },
          {
            item: 'Check-out',
            description: new Date(booking.toDate).toDateString()
          },
          {
            item: 'Guests',
            description: booking.guests
          },
          {
            item: 'Total Amount',
            description: `₹${booking.price}`
          }
        ]
      },
      action: {
        instructions: 'You can view your booking details by clicking the button below:',
        button: {
          color: '#ff385c',
          text: 'View Booking',
          link: 'http://localhost:5173/mybookings'
        }
      },
      outro: 'Thank you for choosing HomelyHub!'
    }
  };

  await sendEmail({
    email: user.email,
    subject: 'Booking Confirmation - HomelyHub',
    mailgenContent
  });
};

// Send welcome email
export const sendWelcomeEmail = async (user) => {
  const mailgenContent = {
    body: {
      name: user.name,
      intro: 'Welcome to HomelyHub! We are excited to have you on board.',
      action: {
        instructions: 'To get started, please explore our properties:',
        button: {
          color: '#ff385c',
          text: 'Browse Properties',
          link: 'http://localhost:5173'
        }
      },
      outro: 'Need help? Just reply to this email, we would love to help.'
    }
  };

  await sendEmail({
    email: user.email,
    subject: 'Welcome to HomelyHub!',
    mailgenContent
  });
};
