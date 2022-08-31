import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthModule } from '../src/auth/auth.module';
import { SiweMessage } from 'siwe';
import { personalSign } from '@metamask/eth-sig-util';

const JUNK_PRIVATE_KEY =
  'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
const JUNK_ADDR = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

const privateKey = Buffer.from(
  'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  'hex',
);

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('get nonce and then verify', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/nonce')
      .send({
        ethAddress: JUNK_ADDR,
      })
      .set('Accept', 'application/json')
      .expect(201);
    expect(res.body).toHaveProperty('nonce');
    expect(res.body.success).toBe(true);

    const domain = 'example.com';
    const uri = 'http://www.example.com';
    const statement = `example uses this signature to verify that you are the owner of this Ethereum address.`;

    const message = new SiweMessage({
      domain,
      address: JUNK_ADDR.trim(),
      statement,
      uri,
      version: '1',
      chainId: 1,
      nonce: res.body.nonce,
    });
    const signedMessage = message.prepareMessage();
    const signature = personalSign({
      privateKey,
      data: signedMessage,
    });
    const res2 = await request(app.getHttpServer())
      .post('/auth/verify')
      .send({
        message: signedMessage,
        signature,
      })
      .set('Accept', 'application/json')
      .expect(201);
    expect(res2.body).toHaveProperty('access_token');
    expect(res2.body.success).toBe(true);
  });
});
