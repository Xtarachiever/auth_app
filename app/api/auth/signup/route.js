
import { connectToDB } from '../../../../database/conn';
import Users from '../../../../model/Schema';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req,res){
    // only post method is accepted
    if(req.method === 'POST'){
        try {
            await connectToDB();
            const reqBody = await req.json();
            const { username, email, password } = reqBody

            // if no body in the request
            if(!reqBody) return NextResponse.json({error: "Don't have a request body", success: false}, {status: 404, statusText:"Don't have form data..."});

            // check duplicate users
            const checkexisting = await Users.findOne({ email });
            if(checkexisting) return NextResponse.json({error: "User already exists", success: false}, {status: 422, statusText:'User already exists...'});

            // hash password
            const newUser = new Users({
                username:username,
                email:email,
                password:await hash(password, 12)
            })
            await newUser.save();
            return new Response(JSON.stringify(newUser),{status:201})

            } catch(err) {
            return NextResponse.json({error: 'Failed to create new user', success: false}, {status: 500, statusText:err});
        }
    }

}
