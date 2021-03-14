/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//import path from 'path';
import { google } from 'googleapis';
//import { authenticate } from '@google-cloud/local-auth';
import fs from "fs";
// import { FullMatch } from "hltv/lib/models/FullMatch";

// initialize the Youtube API library
const youtube = google.youtube('v3');

// "Upload" the video by saving it to the specified location under a match specific name.
const uploadHighlightVideo = async (videoPath: string): Promise<void> => {

    // const title = createTitle(match);
    // console.log(title, savePath);
    
    // const filePath = `${savePath}${title.replace(/[&/\\#,+()$~%.'":*?<>{}]/g, "")}.mp4`;

    try {
        await upload(videoPath);
        // console.log(`"Uploaded" the highlight video at ${videoPath} to ${filePath}`);
    } catch (uploadError) {
        console.error(uploadError);
    }
};

// const createTitle = (match: FullMatch) => {
//     return `${match.team1!.name} vs ${match.team2!.name} - ${match.event.name}`;
// };

// very basic example of uploading a video to youtube
const upload = async (fileName: string) => {
    // // Obtain user credentials to use for the request
    // const auth = await authenticate({
    //     keyfilePath: path.join(__dirname, '../config/client_secret.json'),
    //     scopes: [
    //         'https://www.googleapis.com/auth/youtube.upload',
    //         'https://www.googleapis.com/auth/youtube',
    //     ],
    // });

    google.options({ auth });
    
    const res = await youtube.videos.insert(
        {
            part: ['id,snippet,status'],
            notifySubscribers: false,
            requestBody: {
                snippet: {
                    title: 'Another test',
                    description: 'Testing YouTube upload via Google APIs Node.js Client',
                },
                status: {
                    privacyStatus: 'private',
                },
            },
            media: {
                body: fs.createReadStream(fileName),
            },
        }
    );
    console.log(res.data);
    return res.data;
};

const getOAuth2Client = () => {
    const client_secret = JSON.parse(fs.readFileSync('../config/client_secret.json').toString());
    const auth = new google.auth.OAuth2(client_secret.client_id, client_secret.client_secret, client_secret.redirect_uris[0]);
 
};


export { uploadHighlightVideo };