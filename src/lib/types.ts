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

export interface FourChanOPThread {
    no: number;
    resto: number;
    sticky: number;
    closed: number;
    now: string;
    time: number;
    name: string;
    trip: string;
    id: string;
    capcode: string;
    country: string;
    country_name: string;
    sub: string;
    com: string;
    tim: number;
    filename: string;
    ext: string;
    fsize: number;
    md5: string;
    w: number;
    h: number;
    tn_w: number;
    tn_h: number;
    filedeleted: number;
    spoiler: number;
    custom_spoiler: number;
    omitted_posts: number;
    omitted_images: number;
    replies: number;
    images: number;
    bumplimit: number;
    imagelimit: number;
    last_modified: number;
    tag: string;
    semantic_url: string;
    since4pass: number;
    unique_ips: number;
    m_img: number;
}
