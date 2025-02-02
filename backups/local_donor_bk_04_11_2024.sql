--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    id integer NOT NULL,
    user_id integer,
    provider character varying(255) NOT NULL,
    provider_account_id character varying(255) NOT NULL,
    refresh_token character varying(255),
    access_token character varying(255),
    access_token_expires timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.accounts_id_seq OWNER TO postgres;

--
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_id_seq OWNED BY public.accounts.id;


--
-- Name: articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articles (
    id integer NOT NULL,
    title jsonb NOT NULL,
    short jsonb NOT NULL,
    description jsonb NOT NULL,
    meta jsonb,
    active boolean DEFAULT true,
    featured_image character varying(255),
    author_id integer,
    views integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.articles OWNER TO postgres;

--
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.articles_id_seq OWNER TO postgres;

--
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    "blockHash" character varying(255),
    "blockNumber" integer,
    "from" character varying(255),
    gas integer,
    "gasPrice" character varying(255),
    "gasUsed" integer,
    hash character varying(255),
    "timeStamp" character varying(255),
    "to" character varying(255),
    txreceipt_status integer,
    value character varying(255),
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "poolId" integer
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- Name: donors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.donors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.donors_id_seq OWNER TO postgres;

--
-- Name: donors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.donors_id_seq OWNED BY public.transactions.id;


--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.knex_migrations_id_seq OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO postgres;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNER TO postgres;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: pools; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pools (
    id integer NOT NULL,
    title jsonb,
    description jsonb,
    active boolean DEFAULT true,
    type character varying(255),
    eth_address character varying(255),
    prize_amount real,
    entry_amount real,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    drawn_status text DEFAULT 'inactive'::text NOT NULL,
    drawn_data jsonb,
    drawn_at timestamp with time zone,
    CONSTRAINT pools_drawn_status_check CHECK ((drawn_status = ANY (ARRAY['inactive'::text, 'pending'::text, 'in_progress'::text, 'completed'::text])))
);


ALTER TABLE public.pools OWNER TO postgres;

--
-- Name: pools_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pools_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pools_id_seq OWNER TO postgres;

--
-- Name: pools_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pools_id_seq OWNED BY public.pools.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    image character varying(255),
    email_verified boolean DEFAULT false,
    is_admin boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: accounts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);


--
-- Name: articles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Name: pools id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pools ALTER COLUMN id SET DEFAULT nextval('public.pools_id_seq'::regclass);


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.donors_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts (id, user_id, provider, provider_account_id, refresh_token, access_token, access_token_expires, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.articles (id, title, short, description, meta, active, featured_image, author_id, views, created_at, updated_at) FROM stdin;
1	{"en": "title ENXX", "es": "title ESYY"}	{"en": "short EN xx", "es": "short ES yy"}	"adad"	{"en": {"keywords": "some value here", "description": "some value here"}, "es": {"keywords": "some value\\r\\n", "description": "some value"}}	t	\N	\N	0	2024-10-22 09:41:56.612+03	2024-10-22 12:34:51.075+03
\.


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
2	20240711075950_craete_tables.js	1	2024-07-12 17:32:36.372+03
3	20240816110945_create_users_table.js	2	2024-08-16 14:32:37.403+03
4	20240816113300_create_accounts_table.js	3	2024-08-16 14:35:31.648+03
5	20240902133126_rename_donors_to_transactions.js	4	2024-09-02 16:32:09.431+03
8	20240916114903_update_pools_table.js	5	2024-09-16 14:53:22.991+03
9	20240917060947_update_pools_multilangual_fields.js	6	2024-09-17 09:20:35.013+03
10	20240930115926_add_draw_fields_to_pools.cjs	7	2024-09-30 15:00:11.817+03
11	20241021090822_create_articles_table.cjs	8	2024-10-21 12:30:21.008+03
\.


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- Data for Name: pools; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pools (id, title, description, active, type, eth_address, prize_amount, entry_amount, created_at, updated_at, drawn_status, drawn_data, drawn_at) FROM stdin;
39	{"en": "title en edited", "es": "title es asda"}	{"en": "<p>Test desc changed</p>", "es": "<p>Test desc ES xxx</p>"}	t	normal	0x092Aa7B28Ee01F85Ffc0B3ae941FE1926F8fA3d3	0.2	0.004	2024-09-17 10:27:25.348+03	2024-09-24 11:23:26.855+03	completed	{"id": 88, "to": "0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3", "gas": 21000, "from": "0x9eca171ea62b7ac92e4258f71f195042b3e2ece6", "hash": "0xa4894f81c82c69463be4d4aa4d610b548b677688a78fa4828935ea1b90c9aa09", "value": "1000000000000000", "poolId": 39, "gasUsed": 21000, "gasPrice": "7821160314", "blockHash": "0xcfb5422274f8ba0798dda29650715145bfc63631a19d46399169e5a7c7cc917c", "createdAt": "2024-09-17T06:40:00.941Z", "timeStamp": "2024-08-30T12:51:00.000Z", "blockNumber": 6600217, "txreceipt_status": 1}	2024-10-16 11:48:01.17+03
40	{"en": "Test another pool EN XXX", "es": "Test another pool ES"}	{"en": "<p>Description EN</p>", "es": "<p>Description ES</p>"}	t	normal	0x092Aa7B28Ee01F85Ffc0B3ae941FE1926F8fA3d3	0.2	0.004	2024-09-24 17:53:52.316+03	2024-09-30 15:07:45.446+03	completed	{"id": 111, "to": "0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3", "gas": 21000, "from": "0x9eca171ea62b7ac92e4258f71f195042b3e2ece6", "hash": "0x01c93f48b79054117f6fc8fc0e309a2ca1161433a353c23379872d906510f5b5", "value": "1000000000000000", "poolId": 40, "gasUsed": 21000, "gasPrice": "24196112148", "blockHash": "0x799c4e5d7e636b2809ecde111cd9c32423b953c836e36f2047f74ca936922659", "createdAt": "2024-09-18T07:45:01.271Z", "timeStamp": "2024-09-18T07:44:00.000Z", "blockNumber": 6714006, "txreceipt_status": 1}	2024-09-30 17:34:17.577+03
41	{"en": "Test second MAINNET SMART CONTRACT", "es": "Test firts Sepolia SMART CONTRACT ES"}	{"en": "<p>This is the shit!</p>", "es": "<p>This is the shit! in spanish</p>"}	t	normal	0x0f63cc1031d656921c3D4D13dDe38eCb10e9F759	0.02	0.001	2024-10-01 16:58:10.715+03	2024-10-04 14:09:17.597+03	inactive	{"id": 130, "to": "0x0f63cc1031d656921c3d4d13dde38ecb10e9f759", "gas": 26648, "from": "0x9eca171ea62b7ac92e4258f71f195042b3e2ece6", "hash": "0x61fb5a845ae750f0b353ee4ae501a62d23c1d7f1c00d4ca565d485af1d30fb18", "value": "1000000000000000", "poolId": 41, "gasUsed": 26305, "gasPrice": "5268383097", "blockHash": "0x560919324a7a7c67c5f992a85ba5a08548c2ac1c2620dcaf6776e06500727fa1", "createdAt": "2024-10-07T08:50:00.975Z", "timeStamp": "2024-10-04T11:51:47.000Z", "blockNumber": 20891977, "txreceipt_status": 1}	2024-10-16 12:14:17.446+03
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (id, "blockHash", "blockNumber", "from", gas, "gasPrice", "gasUsed", hash, "timeStamp", "to", txreceipt_status, value, "createdAt", "poolId") FROM stdin;
66	0x710a854fa70c11f1e257114ffde56f1b2f50d41c68fb10a110a93fdf53d5caee	6703500	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	11115686041	21000	0x3c45dbb4900003401787d92c0a3526973a5b9d612f212b8bd9f19e157b41a225	2024-09-16T15:14:48.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-16 18:20:00.888637+03	39
113	0x6107cb586e8a068ce2eee795e45969eb8a9b1d2d5a9528d302dca78d26523895	6749332	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	22478006322	21000	0x1f10086f5c025286c4c88c223e30e6924628ae33ac8af2026e4a859fc24a5582	2024-09-24T05:35:12.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-24 08:37:00.845327+03	39
114	0xfac006858edfc38881adb08d33a2ceeca27a970550997211b652062324ca136d	6749344	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	20767379471	21000	0xf37103261e4f4836343ba4ed786c33121aaa0d16138b05897d2376d8a546ce75	2024-09-24T05:38:00.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-24 08:39:00.825146+03	39
68	0x734ff9ff09b42234a9d922ea7f2350ce922908f9ac1955edbe7cce9240300d94	6654203	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	6531650919	21000	0xa0a96738f4761b4505d1c341e34ffaf89f27daa5806c0fdf833fdb805ef2d4dc	2024-09-08T08:39:48.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.926482+03	39
69	0x67ed814acd4311c1d970113645e8556d43c735db472b2ca64a30e64ab4add726	6637639	0x9a92ac9d100fa398b61599565ad9eb3a936641b2	21000	85942874235	21000	0x0b1ac24b747b03b9503a0f6e32e65b8cb3f64bcd72da43c07f903257db5ba593	2024-09-05T13:56:36.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1999991410067500	2024-09-17 09:40:00.927861+03	39
70	0x62a829006a24d2b5375d6efaea3a053d8acd3ecd066c6ed970dc7d845aa1c7d7	6637599	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	70154561733	21000	0x88ec0d0b1c042c66620cf73e31513bc32550b02c2c718ebb70de5edfad4ca5fe	2024-09-05T13:47:12.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.92988+03	39
71	0xcbffbf3f098d11557fe251ccb8482cb30f4b57a2a53d47c6a0c52cb894c9de2f	6637544	0x9a92ac9d100fa398b61599565ad9eb3a936641b2	21000	81562031391	21000	0xab7fbcf95e7e5a1f6995e93fef84c522b6f179c95110c24e69f0f107d5a5fed4	2024-09-05T13:33:48.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.930978+03	39
72	0x20dfd714d057d5d5c390410eff7b1ca15ddd2b5e77223357090c5264f02baf27	6637468	0x9a92ac9d100fa398b61599565ad9eb3a936641b2	21000	86920686887	21000	0xb16c04d9eb209f895e47d17c0b67a35f81dab42d601f84845552f42577c2937e	2024-09-05T13:15:36.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.931666+03	39
73	0x412f5f672de595ce6e1e6c52b322012a38d6f4acaeb34c90de24f0828cea0f9e	6637427	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	77343776116	21000	0x4c184aa76c81f17664d100a7aa3c3399eef7d489c9494809d8d8d90761c56c61	2024-09-05T13:05:36.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.932416+03	39
74	0xfb8df0ca27146bc6f1844f66380cc41eeaeb9bd4fb2d14995a67b8d8f6e14c4a	6637137	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	49321875651	21000	0x69e16cb5b06ea06217dbfc0c086143ff6a0de993e84d7a70864cf1257d289904	2024-09-05T11:53:48.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.932965+03	39
75	0x7ac94b66282cf1912050057847964400b0e250f97a1f237d5d6216e25a472f78	6636853	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	41307643560	21000	0xa5367abb3e47dc430417178499cc39cc8e9b4993f168ac925f8136ce4137fb55	2024-09-05T10:47:24.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.93351+03	39
76	0x8af7bd76a51bc862aa66e5dd92b74e47be97ae03a4a4a5a31b09c1a1ee29211c	6636722	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	40862291654	21000	0x13b83e9d90a8b0c65cd3c2182bd4664016b09774559d5ba3540880516833c0c4	2024-09-05T10:14:48.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.934024+03	39
77	0x0e352d02ea863f5c0f52dfc153b5354b830006bf3463d1633a64ec75d96e910b	6636564	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	50745075494	21000	0xafbbd55f6a8462a11b7a8a773a8eefbd70b389feaa03c08205d3b9ef3fb80664	2024-09-05T09:38:48.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.934555+03	39
78	0x2e738aac277e7ac5ba82dc06dffdcadf24976169a802e11384d81b06969ac886	6636422	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	58060201153	21000	0x27dbc3575f7ef126fb2f949d47093c9c923291fd145de3bbb2027913873e7724	2024-09-05T09:04:48.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.935061+03	39
79	0xccf0e1ec8e2106375a68777d8e7a228ff3453fe03cd2631783082ffb6b2cf7e4	6636087	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	64359968122	21000	0x7db7a3005d35c6c11028871d6a7f2865b33fa47926dcd4d9900ed6bb254e5720	2024-09-05T07:44:00.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.93565+03	39
80	0x6285175b97f537b9e0857343d9309102b12e2a7220c35dc3b116fedd307e28ac	6636044	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	69014997477	21000	0xf46160a87694c801edbed6e9d07181ecf2b734f16feb2e7316904d1d4df83dfa	2024-09-05T07:34:24.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.93608+03	39
111	0x799c4e5d7e636b2809ecde111cd9c32423b953c836e36f2047f74ca936922659	6714006	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	24196112148	21000	0x01c93f48b79054117f6fc8fc0e309a2ca1161433a353c23379872d906510f5b5	2024-09-18T07:44:00.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-18 10:45:01.271+03	40
81	0xe73d7f827db926e697dbc2a1d9a2bf46fd2441b777d59eee7b6d928605b18eb6	6636014	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	61404099438	21000	0x02d9b911c7e3e5d29832a912819c4eef61af3a58d7699e9c56e6ec95aaf04240	2024-09-05T07:26:36.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.936529+03	39
115	0x2144b7d5e48131ce94d6319113293f931fcd2d202000d9b7b6bd438d65e93e1c	6798865	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	393779571572	21000	0x2349515524a1ae811a09e69846e137f02665125e6a81c6c8f9a584095f0d6783	2024-10-02T06:22:24.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	4000000000000000	2024-10-02 09:24:01.458677+03	39
67	0xcd5de74541e5b6c33e454a1e937c5d90f044ad7d0193f43e2f37faf20267f26e	6702704	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	8017242309	21000	0x178433cbfa9a042f9ccbddabfd74ebe0fe39c5412faf5b0120a9bbc48fdcaee0	2024-09-16T12:16:12.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.921201+03	39
82	0xa76315f4a7ac6e8b79e4b3607ce6f1afc1368d7c8d5fd637fcd2dda433aa05b0	6635913	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	154407861540	21000	0x73cb15ab830cc237d05d30f196ecd6450188c9d129685939ce7af7f4543d0f2d	2024-09-05T07:02:12.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.937025+03	39
83	0x9e0215f0f54eea1dbbd66660ce27fd41f4261dab5bd775f732a64b19c836524c	6635845	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	112987167652	21000	0xcf5b106b95f1852e9e12f1156d7b38e2c3ee2c488ba18bf4dc3f6ba55d5970bf	2024-09-05T06:44:36.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.937712+03	39
84	0x8e339c9e946a9a8975f50019dbba8b882f42affe5673dc93266b36ac628cda90	6631977	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	66282385528	21000	0xd38af1cb68aeb8a395d24d5ccaaba7fc3d43e80a471f2bbe6f395ec721f1a876	2024-09-04T15:20:24.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.938508+03	39
85	0xba440ebfd5b864ed9ac983c734f285f45af798e766bb853aae44d259a133b9d3	6600868	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	25820834503	21000	0x6b5c0689f7d9e16ae2d3cd857d856a976f3380912bfa3c34d4c313efb3d6ceb4	2024-08-30T15:22:36.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.939111+03	39
86	0x634f55dcff0c1f16d4afd03257c185381ce2837c4e229c1cf9dc221c5f3689f4	6600291	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	7989314679	21000	0x1b1595c5dcca9889755cc0084546edcb2c25eb2aa5d7ec27edcea94e564413c7	2024-08-30T13:06:24.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.939666+03	39
87	0xc0130e756ee7740aab4063d4b6599acccae68d3fbf4be140a7d7e668aeb19421	6600245	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	8003033402	21000	0xf9dbbeb3a2ee802ff3d6c003b4dd4b0e71c85c4b8f9bc8bc9a3e0cb554f662f9	2024-08-30T12:57:12.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.940306+03	39
88	0xcfb5422274f8ba0798dda29650715145bfc63631a19d46399169e5a7c7cc917c	6600217	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	7821160314	21000	0xa4894f81c82c69463be4d4aa4d610b548b677688a78fa4828935ea1b90c9aa09	2024-08-30T12:51:00.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.941098+03	39
89	0xc8be2dc8f8215bea8718a54cf5eb13232bbf449a1a6eb0bf288a11ab9f5aa5b1	6599965	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	14064518433	21000	0xeffa7b91822405ee6494941bc236889dc7eae1e3f882eccc8ad128b8769cefbe	2024-08-30T11:53:36.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.941655+03	39
90	0xff3a74888308b3bbeb556cd0ba996d3082bb9d048631ad800a9e37f8adc5b3f0	6594493	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	45301193478	21000	0x1efcd12bebf129674b51340e2af7c5f538ec02959ad34a4ebe6d6244261f271b	2024-08-29T15:04:12.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.942175+03	39
91	0xb6c10a85a472c408c3af675333bf141104e3d4ef96a42ef8e83ea8a034f88869	6592555	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	178311080717	21000	0x752c65f9e754d78df72f1b622be95bc12275acd8eca30f62cfc886b78aa27514	2024-08-29T07:45:48.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	100000000000000	2024-09-17 09:40:00.943189+03	39
92	0xa3fa6b4dff873275674a4249b941bf0a05f4a1ad7b88569c9b27fc68224d0e55	6592416	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	60178126827	21000	0x272a72c73d00c8902000bec3e89509ca3a904804250a563fed061ad77fb5d36c	2024-08-29T07:12:36.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	100000000000000	2024-09-17 09:40:00.943738+03	39
93	0xac70e2149e5e0f0a72ef8e75613c3cd546022ad66b256a95726a55f4bea06ccf	6587902	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	51934249070	21000	0xc87032a4d94bbacfce2fd2bd3dec443f134e543d5fecf5a92dcd64b34890d02f	2024-08-28T14:07:24.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	100000000000000	2024-09-17 09:40:00.944265+03	39
94	0xb3be9f0378ae2e93956018052d2cd931b0a4f64230f861476f1da2da4bb005bc	6586398	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	59290785262	21000	0x4c12f340ba6702164c96755d44e057a62c9a32a6a9637956933b4e351a2129c9	2024-08-28T08:20:00.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.944769+03	39
95	0x88e6c5bd2d53f08c2a2e2b345e1676151b783910d29e8464ee513ba774ed5b7c	6580803	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	45438824134	21000	0x9afd829bb7ed629ff1c363dfbf5a09f1615e002e7128f70083482f121fa8af8a	2024-08-27T10:54:48.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	300000000000000	2024-09-17 09:40:00.945297+03	39
96	0x3f2d26fb4ef9349a4e8f921b6698441ce539082e0dc735730c81b3ffaa8edaa6	6580726	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	60773556160	21000	0x100c2fd525a86d2c72b3a1543fc8730bcd21aaacc5c8bb92a0cb7200f350b09b	2024-08-27T10:37:24.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	100000000000000	2024-09-17 09:40:00.945847+03	39
97	0x5b1435ebdc7907d8cb4e03fed905bf8625c6b23c10431f807e35078c7bb8375e	6580645	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	92143873488	21000	0xead1816f39183b733dc1bcd1abc7fdfd51f620c2043db4826e96d79edf9449fb	2024-08-27T10:19:48.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.946409+03	39
98	0xfd7a67209ce476745f74c67a0c45bc0d0056f01ab45064e23a9cea88e7d7517e	6580096	0x9a92ac9d100fa398b61599565ad9eb3a936641b2	21000	128187551358	21000	0x7934b4a5bc0d895d4807804e167ecf36b457acea7fcd782982152ea9c2bd31ad	2024-08-27T08:16:12.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.947165+03	39
99	0x0e72df640323246fa9e88d88784022c829f6a9ac05f1f7921a3fbde2cb825cf5	6402590	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	15621524424	21000	0x4d1d08397ace74d4c38b024f0d9c1825536614c035d036f2d3da249506f9957e	2024-07-30T08:30:48.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.947671+03	39
100	0x03a3c56c17163bc38b7bb0932fcf5797b6ae2ee7ef600b34908ef01fe32c133d	6326480	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	17002598761	21000	0x58f5c40c1cd8d510cbeddd6d29bd9454642e9b1205ed3f49314ad9c93ba60268	2024-07-17T09:09:12.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1500000000000000	2024-09-17 09:40:00.948189+03	39
101	0xdeffa18c28b83b522684c67e272bbd299272a31ea87bb640a845752cf38fcff4	6326470	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	17060151008	21000	0x679c097d8b41b13ef49af1c90953e7133f157d9b3172a6b44fb52a699451e200	2024-07-17T09:06:48.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	4294967277	2024-09-17 09:40:00.948726+03	39
102	0xecbc15d4d701e611d6ab406b0aa6bae485e473f8c40734e3d1f8e95cdbfb8ec8	6326453	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	16896601004	21000	0xb0f0f57dad267f459e81b935bec6f62a09685a741cd71f13c3cd280aad8844bf	2024-07-17T09:02:36.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.949322+03	39
103	0xfa9ad0983d231ce4cdb07abc89529fef40b3345ae1cee413ab51eaec023c6275	6298039	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	8383235578	21000	0x41b2ef04202419c9d01cfeb3085da838dc8095210a4556f51ca8d132c5b0fec3	2024-07-12T18:52:00.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	4294965297	2024-09-17 09:40:00.94992+03	39
104	0xb0a2642dd9831cbf259194584f2c3abd92684398eaefbb29f7970bd40b135ebc	6296362	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	8686912064	21000	0xc601820f6ecad913e1a62c2a0c0382561eb2acaa2ef3987cffd443e18ac2b044	2024-07-12T12:46:24.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.950466+03	39
105	0x5da7b6be820e392a6727d8e3ee3d213214a2f3351da5f698c060837ecea57522	6296355	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	9291183439	21000	0x0d5f27878a96fd6ec49958ab1901cb59e9f9f18474e81b274541ee5babab0517	2024-07-12T12:45:00.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1500000000000000	2024-09-17 09:40:00.95098+03	39
106	0x4876c5950b9ce80ee47a04dcdfbcdf4c4a814a9c82efa46c31d85861db2770e5	6296253	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	12189441714	21000	0x092afb47c9d390acb870b7dee9ae6d29f1c9067a7b78064357a2c161ab6d82c9	2024-07-12T12:22:00.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1500000000000000	2024-09-17 09:40:00.951472+03	39
107	0xb62f1cc17faabb44a678496a590b0972af49005ff15aa574f10a8840556a178e	6296240	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	12188289046	21000	0xf6ccadfe3ff628f80e1f5342fb468755b3c5e6578e2914adeb7ec016bed982bf	2024-07-12T12:19:00.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.952171+03	39
108	0xead6d4425e39d7f052852c6891883527ebf88fc7ac6bf8f00ad6e862a31cea09	6295893	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	9283853491	21000	0x14d04e08230e196e3f3211d28587fc5aadafb737d10e784fe0d5120f174d14d1	2024-07-12T11:03:12.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.952834+03	39
109	0x8f096db27c587f50b4f668d49574b0a3a9a059db8098f0e40dbcd2158da1d1f2	6295602	0x9a92ac9d100fa398b61599565ad9eb3a936641b2	21000	8867456248	21000	0xcca7c2687ff736b9a23234a6873ca49b08a562b54a8867ada2a280dd6cc1335f	2024-07-12T09:59:00.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.953405+03	39
110	0xe18ac7da4d901963f00af2397677da8eb28871a04ed9e9248876d03176159d10	6295589	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	9345057837	21000	0xc27e80237a391ade352ad6caffd6c9898d369321beaf647cbb4bbc2d0b6bc65d	2024-07-12T09:56:12.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-17 09:40:00.953887+03	39
112	0x69a2f5eb47aec3aef220a461f4e9727abab95d03330a4893f2e88c9d925b8320	6749279	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	21000	27588570246	21000	0x5195c50af23ea34333735f1e30f33c7e7104599d76e9c54881bab9a0ef791ab9	2024-09-24T05:23:12.000Z	0x092aa7b28ee01f85ffc0b3ae941fe1926f8fa3d3	1	1000000000000000	2024-09-24 08:25:01.481908+03	39
131	0xbf0ef9c836d0fbd627c7be18db8c4881fbadce328a76dda6f62c99a798ca51bb	20890896	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	26648	4562985579	26305	0xe6cb630012c2e5c3533c97810309a4058b256de269f9d8a3b9dd97b7fe21fdcc	2024-10-04T08:15:11.000Z	0x0f63cc1031d656921c3d4d13dde38ecb10e9f759	1	1000000000000000	2024-10-07 11:50:00.977815+03	41
130	0x560919324a7a7c67c5f992a85ba5a08548c2ac1c2620dcaf6776e06500727fa1	20891977	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	26648	5268383097	26305	0x61fb5a845ae750f0b353ee4ae501a62d23c1d7f1c00d4ca565d485af1d30fb18	2024-10-04T11:51:47.000Z	0x0f63cc1031d656921c3d4d13dde38ecb10e9f759	1	1000000000000000	2024-10-07 11:50:00.975815+03	41
129	0x61bcc0e2ce6628cb309e757cfdfe1200cdfe72a6d9d464ed1e19e33bbcaedb8b	20893080	0x9eca171ea62b7ac92e4258f71f195042b3e2ece6	26648	11823364422	26305	0x66412b967765c88308bd34f11c9e1e63ddc761e5ac1277c5c26666bd90a7b139	2024-10-04T15:32:59.000Z	0x0f63cc1031d656921c3d4d13dde38ecb10e9f759	1	1000000000000000	2024-10-07 11:50:00.971031+03	41
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password_hash, image, email_verified, is_admin, created_at, updated_at) FROM stdin;
9	Test4	guliman.nicu4@gmail.com	$2a$10$3tlWnt8fxPY6qkbOA2F8lOaCNEDkfqnq2BbiWv6QsWz93kSePdogi		f	f	2024-08-16 16:59:50.158613+03	2024-08-16 16:59:50.158613+03
10	NicuG	guliman.nicu@gmail.com	$2a$10$K6BMGy4d4L6IQUs0lNdxq.bk9S97J8irOwPdVUJKBXxZen9HZjwnO		f	f	2024-08-16 17:54:22.67606+03	2024-08-16 17:54:22.67606+03
\.


--
-- Name: accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_id_seq', 1, false);


--
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.articles_id_seq', 1, true);


--
-- Name: donors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.donors_id_seq', 131, true);


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 11, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: pools_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pools_id_seq', 41, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- Name: transactions donors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT donors_pkey PRIMARY KEY (id);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: pools pools_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pools
    ADD CONSTRAINT pools_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: articles_active_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX articles_active_index ON public.articles USING btree (active);


--
-- Name: idx_articles_title_en; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_articles_title_en ON public.articles USING btree (((title ->> 'en'::text)));


--
-- Name: accounts accounts_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: transactions donors_poolid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT donors_poolid_foreign FOREIGN KEY ("poolId") REFERENCES public.pools(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

