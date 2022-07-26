import request from "supertest";
import { app, prisma } from "../../src/server";
import { PrismaClient, Prisma, RawExpressMessage } from "@prisma/client";

describe("test /rawMsg/addRawMessage", () => {
  it("input without url", async () => {
    const res = await request(app)
      .post("/rawMsg/addRawMessage")
      .send({
        rawMessage: "hello world11111",
        discordId: "848533604443095121",
        discordName: "kenth123",
        msgId: "dfdfd",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.success).toBe(false);
    // expect(res.body.data.userId).toBe("848533604443095121");
    // expect(res.body.data.rawMessage).toBe("hello world11111");

    // expect(res.body.data).toHaveProperty("createdAt");
    // expect(res.body.data).toHaveProperty("id");
  });

  it("input with url", async () => {
    const rawMsg =
      "以太坊意在建立可扩展的统一的结算和数据可用性层，在利用以太坊的安全性的同时，rollup 扩大了计算量，所有的道路都通向中心化区块生产、去中心化的无需信任区块验证和抗审查这一终局，本文是万字长文打造的以太坊进阶指南。https://www.panewslab.com/zh/articledetails/6dcnccj4.html ";
    const res = await request(app)
      .post("/rawMsg/addRawMessage")
      .send({
        rawMessage: rawMsg,
        discordId: "848533604443095121",
        discordName: "kenth123",
        msgId: "dfdfd2222",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.userId).toBe("848533604443095121");
    expect(res.body.data.rawMessage).toBe(rawMsg);
    expect(res.body.data.parsedUrl).toBe(
      "https://www.panewslab.com/zh/articledetails/6dcnccj4.html"
    );
    expect(res.body.data.parsedMessage).toBe(
      "以太坊意在建立可扩展的统一的结算和数据可用性层，在利用以太坊的安全性的同时，rollup 扩大了计算量，所有的道路都通向中心化区块生产、去中心化的无需信任区块验证和抗审查这一终局，本文是万字长文打造的以太坊进阶指南。"
    );

    expect(res.body.data).toHaveProperty("createdAt");
    expect(res.body.data).toHaveProperty("id");
  });

  it("record the dicord MsgId", async () => {
    const res = await request(app)
      .post("/rawMsg/addRawMessage")
      .send({
        rawMessage: "hello world11111, https://www.panewslab.com/",
        discordId: "848533604443095121",
        discordName: "kenth123",
        msgId: "34342fdsfrgrg",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe("34342fdsfrgrg");
    // expect(res.body.data.rawMessage).toBe("hello world11111");

    // expect(res.body.data).toHaveProperty("createdAt");
    // expect(res.body.data).toHaveProperty("id");
  });
});

describe("test /msg/addMessage", () => {
  beforeAll(async () => {
    await prisma.contentCategory.create({
      data: {
        contentType: "typee",
      },
    });
  });
  it("add Message", async () => {
    const res = await request(app)
      .post("/msg/addMessage")
      .send({
        // rawMessage: rawMsg,
        content: "content",
        url: "url",
        msgId: "dfdfd2222",
        discordId: "848533604443095121",
        contentType: "typee",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.expressUrl).toBe("url");
    expect(res.body.data.expressMessage).toBe("content");
  });
});

describe("test /rawMsg/findRawMessage", () => {
  it("add Message", async () => {
    const res = await request(app)
      .post("/rawMsg/findRawMessage")
      .send({
        msgId: "dfdfd2222",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("parsedUrl");
    expect(res.body.data).toHaveProperty("parsedMessage");
  });
});
