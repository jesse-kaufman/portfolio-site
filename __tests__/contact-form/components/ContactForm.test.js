import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/vue"
import ContactForm from "@/contact-form/components/ContactForm.vue"

describe("ContactForm component", () => {
  test("renders the contact form", () => {
    render(ContactForm)
    expect(screen.getByLabelText(/your name/i)).toBeDefined()
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled() // Ensure disabled initially
  })
})
