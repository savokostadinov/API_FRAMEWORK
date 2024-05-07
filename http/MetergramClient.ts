import BaseClient from "./BaseClient"
import { ResponseEntity } from "express"; // Assuming ResponseEntity is similar to express's Response

import { HOSTNAME } from "../util/HostnameConfig";
import {GetUserResponseBody} from "../model/get/GetUserResponseBody";

export class MetergramClient extends BaseClient {
    // private static readonly authenticate = "/login";
    // private Token: string;

    // private postAuthRequestBody: PostAuthRequestBody = {
    //     email: "nikola_nikolik@hotmail.com",
    //     password: ""
    // };

    constructor() {
        super();
        this.baseUrl = HOSTNAME;
        // this.authenticateOnTheSite(this.postAuthRequestBody);
        // const responseEntity: ResponseEntity<PostAuthResponseBody> = this.authenticateOnTheSite(this.postAuthRequestBody);
        // this.Token = responseEntity.body.token;
        this.addHeader("Content-Type", "application/json");
        // this.addHeader("Authorization", `Bearer ${this.Token}`);
    }

    // public authenticateOnTheSite(postAuthRequestBody: PostAuthRequestBody): ResponseEntity<PostAuthResponseBody> {
    //     return this.post(MetergramClient.authenticate, postAuthRequestBody);
    // }

    public getUserById(id: number): ResponseEntity<GetUserResponseBody> {
        return this.get( "users/" + id);
    }
}
