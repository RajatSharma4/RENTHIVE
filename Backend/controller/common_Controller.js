import ContactModel from "../model/Contact_Model.js";

export async function addContact(request, response) {
    try {
        const { firstname, lastname, email, phone, message } = request.body

        if (!firstname || !email || !message) {
            return response.status(400).json({ 
                success: false, 
                message: "First name, email, and message are required." 
            })
        }

        const contactDoc = new ContactModel({ 
            firstname, 
            lastname: lastname || "", 
            email: email.toLowerCase().trim(), 
            phone: phone || "", 
            message 
        })
        await contactDoc.save()

        return response.status(201).json({ 
            success: true, 
            message: "Contact message submitted successfully. We will get back to you soon!" 
        })
    } catch (err) {
        console.error("addContact error:", err)
        return response.status(500).json({ 
            success: false, 
            message: "Error saving contact message", 
            error: err.message 
        })
    }
}
