import { describe, test, expect, vi } from "vitest"
import { getDogImage } from "../controllers/dogController"
import * as dogService from "../services/dogService"

const createMockResponse = () => {
  const res: any = {}
  res.status = vi.fn().mockReturnThis()
  res.json = vi.fn()
  return res
}

describe("DogController - getDogImage", () => {

  test("returns success true and image from service", async () => {

    vi.spyOn(dogService, "getRandomDogImage")
      .mockResolvedValue({
        imageUrl: "https://mocked-url.com/dog.jpg",
        status: "success"
      })

    const req: any = {}
    const res = createMockResponse()

    await getDogImage(req, res)

   
    expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: {
          imageUrl: "https://mocked-url.com/dog.jpg",
          status: "success"
        }
    })
  })
})