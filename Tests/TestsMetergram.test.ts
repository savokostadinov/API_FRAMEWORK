import {MetergramClient} from "../http/MetergramClient";
import {describe, expect, test} from '@jest/globals';
import {CreateUserRequestPost} from "../model/get/CreateUserRequest(Post)";

describe('TestCasesTests', () => {
    let metergramClient: MetergramClient;

    beforeEach(() => {
        metergramClient = new MetergramClient();
    });

    test('GET List Users', async () => {
        const response = await metergramClient.getUsers(1, 10);
        const users = response.data;
        expect(response.status).toBe(200);
        expect(users.per_page).toBe(10);
        expect(users.total_pages).toBe(Math.ceil(users.total / users.per_page));

        const user5 = users.data[4];
        expect(user5).toBeDefined();
        expect(user5.id).toBe(5);
        expect(user5.first_name).toEqual('Charles');
        expect(user5.last_name).toEqual('Morris');
        expect(user5.email).toEqual('charles.morris@reqres.in');
        expect(user5.avatar).toEqual('https://reqres.in/img/faces/5-image.jpg');

        console.log(`Total Pages: ${users.total_pages}`);
        console.log(`Per Page: ${users.per_page}`);
        console.log(`User ID: ${users.data[4].id}`);
        console.log(`First Name: ${users.data[4].first_name}`);
        console.log(`Last Name: ${users.data[4].last_name}`);
        console.log(`Email: ${users.data[4].email}`);
        console.log(`Avatar: ${users.data[4].avatar}`);
    });


    test('Post create user', async () => {

        const createUserData: CreateUserRequestPost = {
            name: 'Savo Kostadinov',
            job: 'QA Engineer'
        };

        const response = await metergramClient.createUser(createUserData);
        const createdUser = response.data;
        expect(response.status).toBe(201);
        console.log(createdUser);

        expect(createdUser.name).toEqual('Savo Kostadinov'); //response assert
        expect(createdUser.job).toEqual('QA Engineer'); //response assert
        expect(response.data.job).toEqual('QA Engineer'); // request assert
        expect(response.data.name).toEqual('Savo Kostadinov'); //request assert
    });

    test('Delete on user 10', async () => {
        const response = await metergramClient.deleteUserById(10);
        expect(response.status).toBe(204);
    });

    test('Token register endpoint', async ()=>{
        const response = await metergramClient.registerUser(metergramClient.getPostAuthRequestBodyData());
        const registerResponse = response?.data;
        expect(registerResponse.token).toBeDefined();

        const token = metergramClient.getToken();
        expect(token).toBe(registerResponse?.token);
        console.log("Token with id: " + response.data.id + " and email: " + metergramClient.getPostAuthRequestBodyData().email + " is " + token);
    });
});