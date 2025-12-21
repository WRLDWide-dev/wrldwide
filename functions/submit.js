export async function onRequestPost({ request, env }) {
  const data = await request.formData();

  const text = `
  Brand Name: ${data.get("brandName")}
  Brand Description: ${data.get("brandDescription")}
  Name: ${data.get("name")} ${data.get("surname")}
  Email: ${data.get("email")}
  Phone Number: ${data.get("phone")}
`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "Forms <onboarding@resend.dev>",
      to: ["wrldwide.development@gmail.com"],
      subject: "New Website Request",
      text,
    })
  });

  // Redirect user after successful submission
  return new Response(null, {
    status: 303,
    headers: {
      Location: "/thank-you.html"
    }
  });
}
