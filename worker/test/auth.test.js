import test from "node:test";
import assert from "node:assert/strict";
import {generateKeyPair} from "jose";
import {exportPKCS8,decodeJwt} from "jose";
import {serviceToken} from "../src/auth.js";

test("service token has Sheets scope without impersonating a user",async()=>{const {privateKey}=await generateKeyPair("RS256",{extractable:true});const token=await serviceToken({GOOGLE_PRIVATE_KEY:await exportPKCS8(privateKey),GOOGLE_SERVICE_ACCOUNT_EMAIL:"service@example.iam.gserviceaccount.com"});const claims=decodeJwt(token);assert.equal(claims.iss,"service@example.iam.gserviceaccount.com");assert.equal(claims.sub,undefined);assert.equal(claims.aud,"https://oauth2.googleapis.com/token");assert.equal(claims.scope,"https://www.googleapis.com/auth/spreadsheets")});
