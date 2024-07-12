import BaseClient from "./BaseClient"
import { ResponseEntity } from "express"; // Assuming ResponseEntity is similar to express's Response
import { HOSTNAME } from "../util/HostnameConfig";
import {GetUserResponseBody} from "../model/get/GetUserResponseBody";
import {GetUserBodyResponse} from "../model/get/GetUserBodyResponse";
import {CreateUserRequestPost} from "../model/get/CreateUserRequest(Post)";
import {CreateUserResponsePost} from "../model/get/CreateUserResponse(Post)";
import {PostAuthRequestBody} from "../model/get/PostAuthRequestBody";
import {PostAuthResponseBody} from "../model/get/PostAuthResponseBody";


export class MetergramClient extends BaseClient {
    private static readonly authenticate = "/login";
    private Token: string;

    private postAuthRequestBodyData: PostAuthRequestBody = {
        email: "eve.holt@reqres.in",
        password: "pistol"
    };

    constructor() {
        super();
        this.baseUrl = HOSTNAME;
        this.authenticateOnTheSite(this.postAuthRequestBodyData);
        const responseEntity: ResponseEntity<PostAuthResponseBody> = this.authenticateOnTheSite(this.postAuthRequestBodyData);
        this.Token = responseEntity.body?.token;
        // this.addHeader("Content-Type", "application/json");
        this.addHeader("Authorization", `Bearer ${this.Token}`);
    }

    public authenticateOnTheSite(postAuthRequestBody: PostAuthRequestBody): ResponseEntity<PostAuthResponseBody> {
        return this.post(MetergramClient.authenticate, postAuthRequestBody);
    }

    public getUserById(id: number): ResponseEntity<GetUserResponseBody> {
        return this.get( "users/" + id);
    }

    public async getUsers(page: number, per_page: number) {
        return await this.get<GetUserBodyResponse>(`users?page=${page}&per_page=${per_page}`);
    }

    public async createUser(body: CreateUserRequestPost) {
        return await this.post<CreateUserResponsePost>('users', body);
    }

    public async deleteUserById(id: number) {
        return await this.delete<void>(`users/${id}`);
    }

    public getPostAuthRequestBodyData(): PostAuthRequestBody {
        return this.postAuthRequestBodyData;
    }

    public async registerUser(body: PostAuthRequestBody) {
        const response = await this.post<PostAuthResponseBody>('register', body);
        if (response?.data?.token) {
            this.Token = response.data.token;
        }
        return response;
    }

    public getToken(): string {
        return this.Token;
    }


}
