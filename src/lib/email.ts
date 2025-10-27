import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

interface ContactEmailData {
  name: string
  email: string
  subject?: string | null
  message: string
  notificationEmail: string
}

export async function sendContactNotification(data: ContactEmailData) {
  if (!resend) {
    console.warn('Resend API key not configured. Email not sent.')
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@localhost.com'

    const result = await resend.emails.send({
      from: fromEmail,
      to: data.notificationEmail,
      replyTo: data.email,
      subject: `New Portfolio Contact: ${data.subject || 'No Subject'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1976d2;">New Contact Form Submission</h2>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${escapeHtml(data.email)}</a></p>
            ${data.subject ? `<p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>` : ''}
          </div>

          <div style="margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <div style="background: #ffffff; padding: 15px; border-left: 4px solid #1976d2; white-space: pre-wrap;">
              ${escapeHtml(data.message)}
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

          <p style="color: #666; font-size: 14px;">
            Reply directly to this email to respond to ${escapeHtml(data.name)}.
          </p>
        </div>
      `,
    })

    return { success: true, data: result }
  } catch (error) {
    console.error('Failed to send email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    }
  }
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
