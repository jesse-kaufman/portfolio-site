import { describe, it, expect } from "vitest"
import { render, fireEvent } from "@testing-library/vue"
import TextInput from "@/contact-form/components/TextInput.vue"

describe("TextInput.vue", () => {
  describe("rendering", () => {
    it("renders the input with the correct label", () => {
      const { getByLabelText } = render(TextInput, {
        props: {
          label: "Username",
          modelValue: "",
          name: "username",
          type: "text",
        },
      })
      const input = getByLabelText("Username")
      expect(input).toBeInTheDocument()
    })

    it("renders the placeholder correctly", () => {
      const { getByPlaceholderText } = render(TextInput, {
        props: {
          label: "Username",
          placeholder: "Enter your username",
        },
      })
      const input = getByPlaceholderText("Enter your username")
      expect(input).toBeInTheDocument()
    })

    it("renders the input with the correct type", () => {
      const { getByLabelText } = render(TextInput, {
        props: {
          label: "Username",
          type: "text",
        },
      })
      const input = getByLabelText("Username")
      expect(input.type).toBe("text")
    })

    it("renders the required attribute correctly", () => {
      const myRender = render(TextInput, {
        props: {
          label: "Username",
          placeholder: "test"
        },
        attrs: {
          required: true,
        },
      })

      console.log(myRender.html())
      const input = myRender.getByLabelText("Username")
      expect(input).toHaveAttribute("required")
    })
  })

  describe("interaction", () => {
    it("binds the value correctly with v-model", async () => {
      const { getByLabelText } = render(TextInput, {
        props: {
          label: "Email",
          name: "email",
        },
      })
      const input = getByLabelText("Email")
      await fireEvent.update(input, "test@example.com")
      expect(input.value).toBe("test@example.com")
    })
  })
})
