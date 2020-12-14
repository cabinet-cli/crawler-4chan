export interface FourChanBoard {
    /**
     * The directory the board is located in.
     */
    board: string;

    /**
     * The readable title at the top of the board.
     */
    title: string;

    /**
     * Is the board worksafe (1 or 0)
     */
    ws_board: string;

    /**
     * How many threads are on a single index page
     */
    per_page: number;

    /**
     * How many index pages does the board have
     */
    pages: number;

    /**
     * Maximum file size allowed for non .webm attachments (in KB)
     */
    max_filesize: number;

    /**
     * Maximum file size allowed for .webm attachments (in KB)
     */
    max_webm_filesize: number;

    /**
     * Maximum number of characters allowed in a post comment
     */
    max_comment_chars: number;

    /**
     * Maximum duration of a .webm attachment (in seconds)
     */
    max_webm_duration: number;

    /**
     * Maximum number of replies allowed to a thread before the thread stops bumping
     */
    bump_limit: number;

    /**
     * Maximum number of image replies per thread before image replies are discarded
     */
    image_limit: number;

    /**
     *
     */
    cooldowns: any[];

    /**
     * SEO meta description content for a board
     */
    meta_description: string;

    /**
     * Are spoilers enabled (1 or 0)
     */
    spoilers: number;

    /**
     * How many custom spoilers does the board have
     */
    custom_spoilers: number;

    /**
     * Are archives enabled for the board (1 or 0)
     */
    is_archived: number;

    /**
     * Are troll flags enabled on the board (1 or 0)
     */
    troll_flags: number;

    /**
     * Are flags showing the poster's country enabled on the board (1 or 0)
     */
    country_flags: number;

    /**
     * Are poster ID tags enabled on the board (1 or 0)
     */
    user_ids: number;

    /**
     * Can users submit drawings via browser the Oekaki app (1 or 0)
     */
    oekaki: number;

    /**
     * Can users submit sjis drawings using the [sjis] tags	 (1 or 0)
     */
    sjis_tags: number;

    /**
     * Board supports code syntax highlighting using the [code] tags (1 or 0)
     */
    code_tags: number;

    /**
     * Board supports [math] TeX and [eqn] tags (1 or 0)
     */
    math_tags: number;

    /**
     * Is image posting disabled for the board (1 or 0)
     */
    text_only: number;

    /**
     * Is the name field disabled on the board (1 or 0)
     */
    forced_anon: number;

    /**
     * Are webms with audio allowed? (1 or 0)
     */
    webm_audio: number;

    /**
     * Do OPs require a subject (1 or 0)
     */
    require_subject: number;

    /**
     * What is the minimum image width (in pixels)
     */
    min_image_width: number;

    /**
     * What is the minimum image height (in pixels)
     */
    min_image_height: number;
}

export interface FourChanThreadAttachment {
    /**
     * Unix timestamp + microtime that an image was uploaded
     */
    tim: number;

    /**
     * Filename as it appeared on the poster's device
     */
    filename: string;

    /**
     * Filetype
     */
    ext: ".jpg" | ".png" | ".gif" | ".pdf" | ".swf" | ".webm";

    /**
     * Size of uploaded file in bytes
     */
    fsize: number;

    /**
     * 24 character, packed base64 MD5 hash of file
     */
    md5: string;

    /**
     * Image width dimension
     */
    w: number;

    /**
     * Image height dimension
     */
    h: number;

    /**
     * Thumbnail image width dimension
     */
    tn_w: number;

    /**
     * Thumbnail image height dimension
     */
    tn_h: number;

    /**
     * If the file was deleted from the post
     */
    filedeleted?: 1;

    /**
     * If the image was spoilered or not
     */
    spoiler?: 1;

    /**
     * The custom spoiler ID for a spoilered image
     */
    custom_spoiler?: number;
}

export interface FourChanThread {
    /**
     * The numeric post ID
     */
    no: number;

    /**
     * For replies: this is the ID of the thread being replied to. For OP: this value is zero
     */
    resto: number;

    /**
     * MM/DD/YY(Day)HH:MM (:SS on some boards), EST/EDT timezone
     */
    now: string;

    /**
     * UNIX timestamp the post was created
     */
    time: number;

    /**
     * Name user posted with. Defaults to Anonymous
     */
    name: string;

    /**
     * The user's tripcode, in format: !tripcode or !!securetripcode
     */
    trip?: string;

    /**
     * The poster's ID
     */
    id?: string;

    /**
     * The capcode identifier for a post
     */
    capcode?: "mod" | "admin" | "admin_highlight" | "manager" | "developer" | "founder";

    /**
     * Poster's ISO 3166-1 alpha-2 country code
     */
    country?: string;

    /**
     * Poster's country name
     */
    country_name?: string;

    /**
     * Comment (HTML escaped)
     */
    com?: string;
}

export interface FourChanThreadOPItems {
    /**
     * If the thread is being pinned to the top of the page
     */
    sticky?: number;

    /**
     * If the thread is closed to replies
     */
    closed?: number;

    /**
     * OP Subject text
     */
    sub?: string;

    /**
     * Number of replies minus the number of previewed replies
     */
    omitted_posts: number;

    /**
     * Number of image replies minus the number of previewed image replies
     */
    omitted_images: number;

    /**
     * Total number of replies to a thread
     */
    replies: number;

    /**
     * Total number of image replies to a thread
     */
    images: number;

    /**
     * If a thread has reached bumplimit, it will no longer bump
     */
    bumplimit?: 1;

    /**
     * If an image has reached image limit, no more image replies can be made
     */
    imagelimit?: 1;

    /**
     * The UNIX timestamp marking the last time the thread was modified (post added/modified/deleted, thread closed/sticky settings modified)
     */
    last_modified: number;

    /**
     * The category of .swf upload
     */
    tag?: string;

    /**
     * SEO URL slug for thread
     */
    semantic_url: string;

    /**
     * Number of unique posters in a thread
     */
    unique_ips: number;
}

export type FourChanOPThread =
    | (FourChanThread & FourChanThreadOPItems)
    | (FourChanThread & FourChanThreadOPItems & FourChanThreadAttachment);
