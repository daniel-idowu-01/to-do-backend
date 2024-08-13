import app from "./index.js";
import request from "supertest";

describe("JUST FOR TEST", () => {
  it("should return 201 when task is created", async () => {
    const newTask = {
      title: "new PES 2",
      description: "play 50 games of 'The Great Gatsby'",
      due_date: "2024-07-27",
      priority: "medium",
      completed: false,
    };
    const res = await request(app).post("/api/task").send(newTask);

    console.log(res.body);

    expect(res.status).toBe(201);
  });
});
