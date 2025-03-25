import { describe, it, expect } from "vitest"
import { render, fireEvent } from "@testing-library/vue"
import TextInput from "@/contact-form/components/TextInput.vue"

it("should render with the correct label", () => {
  const { getByLabelText } = render(TextInput, {
    props: {
      label: "Your Name",
      modelValue: "",
      name: "name",
      type: "text",
    },
  })

  const label = getByLabelText(/your name/i)
  expect(label).toBeInTheDocument() // The label is rendered in the document
})

describe("TextInput.vue", () => {
  it("renders the input with the correct label", async () => {
    const { getByLabelText } = render(TextInput, {
      props: {
        label: "Username",
        name: "username",
      },
    })

    const input = getByLabelText("Username") // Fetch the input by its label text
    expect(input).toBeDefined() // Ensure the input exists in the document
    expect(input.getAttribute("name")).toBe("username") // Ensure the input has the correct name attribute
  })

  it("binds the value correctly with v-model", async () => {
    const { getByLabelText } = render(TextInput, {
      props: {
        label: "Email",
        name: "email",
      },
    })

    const input = getByLabelText("Email") // Get the input field by label text

    // Simulate typing into the input using the update event
    await fireEvent.update(input, "test@example.com")

    // Ensure the value in the input element reflects the update
    expect(input.value).toBe("test@example.com")
  })
})
