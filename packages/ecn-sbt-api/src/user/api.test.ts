import request from "supertest";
import { app, prisma } from "../../src/server";

beforeAll(async () => {
  await prisma.user.create({
    data: {
      discordId: "848533604443095121",
      expressCount: 0,
      name: "kenth123",
      ethAddress: "0x9A34797de4bf5b556348fd1e5439561ad17925DD",
    },
  });
  await prisma.user.create({
    data: {
      discordId: "848533604443095133",
      expressCount: 0,
      name: "carl",
    },
  });
});

describe("test /user/hasEthAddress", () => {
  //   afterAll(() => {
  //     return;
  //   });
  it("exsiting user with addr", async () => {
    const res = await request(app)
      .post("/user/hasEthAddress")
      .send({
        discordId: "848533604443095121",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.hasEthAddress).toBe(true);
    expect(res.body.data).toHaveProperty("user");
    // expect(res.body.data.userId).toBe("848533604443095121");
    // expect(res.body.data.rawMessage).toBe("hello world11111");

    // expect(res.body.data).toHaveProperty("createdAt");
    // expect(res.body.data).toHaveProperty("id");
  });

  it("exsiting user with no addr", async () => {
    const res = await request(app)
      .post("/user/hasEthAddress")
      .send({
        discordId: "848533604443095133",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.hasEthAddress).toBe(false);

    // expect(res.body.data.userId).toBe("848533604443095121");
    // expect(res.body.data.rawMessage).toBe("hello world11111");

    // expect(res.body.data).toHaveProperty("createdAt");
    // expect(res.body.data).toHaveProperty("id");
  });
  it("not exsiting user in db", async () => {
    const res = await request(app)
      .post("/user/hasEthAddress")
      .send({
        discordId: "84853360444",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.hasEthAddress).toBe(false);

    // expect(res.body.data.userId).toBe("848533604443095121");
    // expect(res.body.data.rawMessage).toBe("hello world11111");

    // expect(res.body.data).toHaveProperty("createdAt");
    // expect(res.body.data).toHaveProperty("id");
  });
});

describe("test /user/updateEthAddress", () => {
  // afterAll(() => {
  //   return;
  // });
  it("new user", async () => {
    const res = await request(app)
      .post("/user/updateEthAddress")
      .send({
        ethAddress: "0xd7c09e006a2891880331b0f6224071c1e890a98a",
        discordId: "8485336044430951dsdsdsdweewf",
        discordName: "random",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty("data");
    const user = await prisma.user.findUnique({
      where: {
        discordId: "848533604443095121",
      },
    });
    expect(user).toBeTruthy();
  });

  it("cant update if ethAddress existed", async () => {
    const res = await request(app)
      .post("/user/updateEthAddress")
      .send({
        ethAddress: "0xd7c09e006a2891880331b0f6224071c1e890a98a",
        discordId: "8485336044",
        discordName: "copycat",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.success).toBe(false);
    const user = await prisma.user.findUnique({
      where: {
        discordId: "8485336044",
      },
    });
    expect(user).toBeFalsy();
  });
  it("cant update ethAddress for existing user with addr", async () => {
    const res = await request(app)
      .post("/user/updateEthAddress")
      .send({
        ethAddress: "0x1cAc7a07e8cb87B73d94747028845638D55d3Fde",
        discordId: "848533604443095121",
        discordName: "random",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.success).toBe(false);
  });

  it(" update ethAddress for existing user without addr", async () => {
    const res = await request(app)
      .post("/user/updateEthAddress")
      .send({
        ethAddress: "0x00000000006c3852cbEf3e08E8dF289169EdE581",
        discordId: "848533604443095133",
        discordName: "carl",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.success).toBe(true);
    const user = await prisma.user.findUnique({
      where: {
        discordId: "848533604443095133",
      },
    });
    expect(user).toBeTruthy();
    expect(user?.ethAddress).toBe("0x00000000006c3852cbEf3e08E8dF289169EdE581");
  });
});
