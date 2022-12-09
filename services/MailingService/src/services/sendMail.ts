import sgmail from '@sendgrid/mail';

sgmail.setApiKey(process.env.EMAIL_API_KEY!)

type Message = {
    to: string
    from: string
    subject: string
    text: string
    html?: string
} 

export const sendMail = async (msg:Message): Promise<void> => {
    await sgmail.send(msg);
}