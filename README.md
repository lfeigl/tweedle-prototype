# Twitter Profile Media Downloader (TPMDL)

Open API for downloading all media of a Twitter profile.

## Requirements

- [Node.js](https://nodejs.org)


## Getting started

1. Run `npm install`.
2. Fill in the generated `.env` file with your [Twitter app](https://developer.twitter.com/apps) credentials.
3. *(optional)* Configure TPMDL in the generated `.env` file.
4. Run `npm start`.


## Usage

Send a HTTP GET request at `/get` with a JSON in its body. The JSON can contain various parameters. See [API](#api) for a detailed documentation.

Example:
```json
{
    "twitter": {
        "screen_name": "twitterapi",
        "exclude_replies": true
    },
    "tpmdl": {
        "media_types": {
            "photo": true,
            "video": false,
            "animated_gif": false
        }
    }
}
```


## API

### `/get`

| HTTP method | body type               | required parameters       |
|:-----------:|:-----------------------:|:-------------------------:|
| GET         | JSON (application/json) | - `twitter`/`screen_name` |

Parameters:
- `twitter` **(object)**: Parameters for the Twitter API
  - `screen_name` **(string)**: @ of the respective profile **(REQUIRED)**
  - `exclude_replies` **(boolean)**: Ignore media in replies *(default: `false`)*
- `tpmdl` **(object)**: Parameters for TPMDL
  - `media_types` **(object)**: Parameters regarding which media types to fetch
    - `photo` **(boolean)**: Fetch pictures *(default: `false`)*
    - `video` **(boolean)**: Fetch videos *(default: `false`)*
    - `animated_gif` **(boolean)**: Fetch GIFs *(default: `false`)*


## Development

- Enable ESLint in your IDE.
- Run the `dev` script to start [nodemon](https://nodemon.io). It will monitor for any changes in the `server` directory and automatically restart your server.
