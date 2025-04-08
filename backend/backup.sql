--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

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

--
-- Name: enum_UserMovies_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_UserMovies_type" AS ENUM (
    'Película',
    'Serie',
    'Documental'
);


ALTER TYPE public."enum_UserMovies_type" OWNER TO postgres;

--
-- Name: enum_UserMovies_watched; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_UserMovies_watched" AS ENUM (
    'Si',
    'No',
    'Viendo'
);


ALTER TYPE public."enum_UserMovies_watched" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Countries" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    flag character varying(255)
);


ALTER TABLE public."Countries" OWNER TO postgres;

--
-- Name: Countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Countries_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Countries_id_seq" OWNER TO postgres;

--
-- Name: Countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Countries_id_seq" OWNED BY public."Countries".id;


--
-- Name: Ejemplos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ejemplos" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Ejemplos" OWNER TO postgres;

--
-- Name: Ejemplos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Ejemplos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Ejemplos_id_seq" OWNER TO postgres;

--
-- Name: Ejemplos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Ejemplos_id_seq" OWNED BY public."Ejemplos".id;


--
-- Name: Genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Genres" (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public."Genres" OWNER TO postgres;

--
-- Name: Genres_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Genres_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Genres_id_seq" OWNER TO postgres;

--
-- Name: Genres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Genres_id_seq" OWNED BY public."Genres".id;


--
-- Name: MovieGenres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MovieGenres" (
    "movieId" integer,
    "genreId" integer
);


ALTER TABLE public."MovieGenres" OWNER TO postgres;

--
-- Name: Movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Movies" (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    "originalTitle" character varying(255),
    "otherTitles" character varying(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    year integer,
    director character varying(255),
    "cast" text,
    companies text,
    genres text,
    synopsis text,
    image character varying(255),
    "countryId" integer
);


ALTER TABLE public."Movies" OWNER TO postgres;

--
-- Name: Movies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Movies_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Movies_id_seq" OWNER TO postgres;

--
-- Name: Movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Movies_id_seq" OWNED BY public."Movies".id;


--
-- Name: UserMovies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserMovies" (
    id integer NOT NULL,
    watched public."enum_UserMovies_watched" DEFAULT 'No'::public."enum_UserMovies_watched" NOT NULL,
    "watchedDate" timestamp with time zone,
    "rewatchedDate" timestamp with time zone[] DEFAULT ARRAY[]::timestamp with time zone[],
    type public."enum_UserMovies_type" DEFAULT 'Película'::public."enum_UserMovies_type" NOT NULL,
    note text,
    "recommendationSource" character varying(255),
    "selectOriginalTitle" boolean DEFAULT true NOT NULL,
    "userId" integer NOT NULL,
    "movieId" integer NOT NULL,
    "currentActive" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."UserMovies" OWNER TO postgres;

--
-- Name: UserMovies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserMovies_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserMovies_id_seq" OWNER TO postgres;

--
-- Name: UserMovies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserMovies_id_seq" OWNED BY public."UserMovies".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "firstName" character varying(255) NOT NULL,
    "lastName" character varying(255) NOT NULL,
    "profilePicture" character varying(255) DEFAULT NULL::character varying,
    "isAdmin" boolean DEFAULT false,
    "isActive" boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: ejemplos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ejemplos (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.ejemplos OWNER TO postgres;

--
-- Name: ejemplos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ejemplos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ejemplos_id_seq OWNER TO postgres;

--
-- Name: ejemplos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ejemplos_id_seq OWNED BY public.ejemplos.id;


--
-- Name: Countries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Countries" ALTER COLUMN id SET DEFAULT nextval('public."Countries_id_seq"'::regclass);


--
-- Name: Ejemplos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ejemplos" ALTER COLUMN id SET DEFAULT nextval('public."Ejemplos_id_seq"'::regclass);


--
-- Name: Genres id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Genres" ALTER COLUMN id SET DEFAULT nextval('public."Genres_id_seq"'::regclass);


--
-- Name: Movies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movies" ALTER COLUMN id SET DEFAULT nextval('public."Movies_id_seq"'::regclass);


--
-- Name: UserMovies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserMovies" ALTER COLUMN id SET DEFAULT nextval('public."UserMovies_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Name: ejemplos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ejemplos ALTER COLUMN id SET DEFAULT nextval('public.ejemplos_id_seq'::regclass);


--
-- Data for Name: Countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Countries" (id, name, flag) FROM stdin;
1	Georgia del Sur y las Islas Sandwich del Sur	https://flagcdn.com/w320/gs.png
2	Granada	https://flagcdn.com/w320/gd.png
3	Confederación Suiza	https://flagcdn.com/w320/ch.png
4	República de Sierra Leona	https://flagcdn.com/w320/sl.png
5	Hungría	https://flagcdn.com/w320/hu.png
6	República de China en Taiwán	https://flagcdn.com/w320/tw.png
7	Territorio de las Islas Wallis y Futuna	https://flagcdn.com/w320/wf.png
8	Barbados	https://flagcdn.com/w320/bb.png
9	Grupo de Islas Pitcairn	https://flagcdn.com/w320/pn.png
10	República de Côte d'Ivoire	https://flagcdn.com/w320/ci.png
11	República de Túnez	https://flagcdn.com/w320/tn.png
12	República Italiana	https://flagcdn.com/w320/it.png
13	República de Benin	https://flagcdn.com/w320/bj.png
14	República de Indonesia	https://flagcdn.com/w320/id.png
15	República de Cabo Verde	https://flagcdn.com/w320/cv.png
16	Federación de San Cristóbal y Nevis	https://flagcdn.com/w320/kn.png
17	República Democrática Popular Lao	https://flagcdn.com/w320/la.png
18	Bonaire, San Eustaquio y Saba	https://flagcdn.com/w320/bq.png
19	República de Uganda	https://flagcdn.com/w320/ug.png
20	Principado de Andorra	https://flagcdn.com/w320/ad.png
21	República de Burundi	https://flagcdn.com/w320/bi.png
22	República de Sudáfrica	https://flagcdn.com/w320/za.png
23	República francés	https://flagcdn.com/w320/fr.png
24	Estado de Libia	https://flagcdn.com/w320/ly.png
25	Estados Unidos Mexicanos	https://flagcdn.com/w320/mx.png
26	República de Gabón	https://flagcdn.com/w320/ga.png
27	Mancomunidad de las Islas Marianas del Norte	https://flagcdn.com/w320/mp.png
28	República de Macedonia del Norte	https://flagcdn.com/w320/mk.png
29	República Popular de China	https://flagcdn.com/w320/cn.png
30	República de Yemen	https://flagcdn.com/w320/ye.png
31	Colectividad de San Barthélemy	https://flagcdn.com/w320/bl.png
32	Bailía de Guernsey	https://flagcdn.com/w320/gg.png
33	islas Salomón	https://flagcdn.com/w320/sb.png
34	Svalbard og Jan Mayen	https://flagcdn.com/w320/sj.png
35	Islas Feroe	https://flagcdn.com/w320/fo.png
36	República de Uzbekistán	https://flagcdn.com/w320/uz.png
37	República Árabe de Egipto	https://flagcdn.com/w320/eg.png
38	República de Senegal	https://flagcdn.com/w320/sn.png
39	República Democrática Socialista de Sri Lanka	https://flagcdn.com/w320/lk.png
40	Estado de Palestina	https://flagcdn.com/w320/ps.png
41	República Popular de Bangladesh	https://flagcdn.com/w320/bd.png
42	República de Perú	https://flagcdn.com/w320/pe.png
43	República de Singapur	https://flagcdn.com/w320/sg.png
44	República de Turquía	https://flagcdn.com/w320/tr.png
45	República Islámica de Afganistán	https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png
46	Aruba	https://flagcdn.com/w320/aw.png
47	Islas Cook	https://flagcdn.com/w320/ck.png
48	Reino Unido de Gran Bretaña e Irlanda del Norte	https://flagcdn.com/w320/gb.png
49	República de Zambia	https://flagcdn.com/w320/zm.png
50	República de Finlandia	https://flagcdn.com/w320/fi.png
51	República de Níger	https://flagcdn.com/w320/ne.png
52	Territorio de la Isla de Navidad	https://flagcdn.com/w320/cx.png
53	Tokelau	https://flagcdn.com/w320/tk.png
54	República de Guinea-Bissau	https://flagcdn.com/w320/gw.png
55	República de Azerbaiyán	https://flagcdn.com/w320/az.png
56	Isla de la Reunión	https://flagcdn.com/w320/re.png
57	República de Djibouti	https://flagcdn.com/w320/dj.png
58	República Popular Democrática de Corea	https://flagcdn.com/w320/kp.png
59	República de Mauricio	https://flagcdn.com/w320/mu.png
60	Montserrat	https://flagcdn.com/w320/ms.png
61	Islas Vírgenes de los Estados Unidos	https://flagcdn.com/w320/vi.png
62	República de Colombia	https://flagcdn.com/w320/co.png
63	República Helénica	https://flagcdn.com/w320/gr.png
64	República de Croacia	https://flagcdn.com/w320/hr.png
65	Reino de Marruecos	https://flagcdn.com/w320/ma.png
66	República Argelina Democrática y Popular	https://flagcdn.com/w320/dz.png
67	Antártida	https://flagcdn.com/w320/aq.png
68	Países Bajos	https://flagcdn.com/w320/nl.png
69	República de Sudán	https://flagcdn.com/w320/sd.png
70	República de Fiji	https://flagcdn.com/w320/fj.png
71	Principado de Liechtenstein	https://flagcdn.com/w320/li.png
72	República Democrática Federal de Nepal	https://flagcdn.com/w320/np.png
73	Asociado de Puerto Rico	https://flagcdn.com/w320/pr.png
74	Georgia	https://flagcdn.com/w320/ge.png
75	República Islámica de Pakistán	https://flagcdn.com/w320/pk.png
76	Principado de Mónaco	https://flagcdn.com/w320/mc.png
77	República de Botswana	https://flagcdn.com/w320/bw.png
78	República Libanesa	https://flagcdn.com/w320/lb.png
79	Estado Independiente de Papúa Nueva Guinea	https://flagcdn.com/w320/pg.png
80	Departamento de Mayotte	https://flagcdn.com/w320/yt.png
81	República Dominicana	https://flagcdn.com/w320/do.png
82	Territorio de la Isla Norfolk	https://flagcdn.com/w320/nf.png
83	Isla Bouvet	https://flagcdn.com/w320/bv.png
84	Estado de Qatar	https://flagcdn.com/w320/qa.png
85	República de Madagascar	https://flagcdn.com/w320/mg.png
86	República de la India	https://flagcdn.com/w320/in.png
87	República Árabe Siria	https://flagcdn.com/w320/sy.png
88	Montenegro	https://flagcdn.com/w320/me.png
89	Reino de eSwatini	https://flagcdn.com/w320/sz.png
90	República de Paraguay	https://flagcdn.com/w320/py.png
91	República de El Salvador	https://flagcdn.com/w320/sv.png
92	Ucrania	https://flagcdn.com/w320/ua.png
93	Isla de Man	https://flagcdn.com/w320/im.png
94	República de Namibia	https://flagcdn.com/w320/na.png
95	Emiratos Árabes Unidos	https://flagcdn.com/w320/ae.png
96	República de Bulgaria	https://flagcdn.com/w320/bg.png
97	Groenlandia	https://flagcdn.com/w320/gl.png
98	República Federal de Alemania	https://flagcdn.com/w320/de.png
99	Reino de Camboya	https://flagcdn.com/w320/kh.png
100	República de Irak	https://flagcdn.com/w320/iq.png
101	Territorio del Francés Tierras australes y antárticas	https://flagcdn.com/w320/tf.png
102	Reino de Suecia	https://flagcdn.com/w320/se.png
103	República de Cuba	https://flagcdn.com/w320/cu.png
104	República Kirguisa	https://flagcdn.com/w320/kg.png
105	Federación de Rusia	https://flagcdn.com/w320/ru.png
106	Malasia	https://flagcdn.com/w320/my.png
107	República Democrática de Santo Tomé y Príncipe	https://flagcdn.com/w320/st.png
108	República de Chipre	https://flagcdn.com/w320/cy.png
109	Canadá	https://flagcdn.com/w320/ca.png
110	República de Malawi	https://flagcdn.com/w320/mw.png
111	Reino de Arabia Saudita	https://flagcdn.com/w320/sa.png
112	Bosnia y Herzegovina	https://flagcdn.com/w320/ba.png
113	República Democrática Federal de Etiopía	https://flagcdn.com/w320/et.png
114	Reino de España	https://flagcdn.com/w320/es.png
115	República de Eslovenia	https://flagcdn.com/w320/si.png
116	Sultanato de Omán	https://flagcdn.com/w320/om.png
117	San Pedro y Miquelón	https://flagcdn.com/w320/pm.png
118	Macao, Región Administrativa Especial de la República Popular China	https://flagcdn.com/w320/mo.png
119	Serenísima República de San Marino	https://flagcdn.com/w320/sm.png
120	Reino de Lesotho	https://flagcdn.com/w320/ls.png
121	República de las Islas Marshall	https://flagcdn.com/w320/mh.png
122	Sint Maarten	https://flagcdn.com/w320/sx.png
123	Islandia	https://flagcdn.com/w320/is.png
124	Gran Ducado de Luxemburgo	https://flagcdn.com/w320/lu.png
125	República Argentina	https://flagcdn.com/w320/ar.png
126	Islas Turcas y Caicos	https://flagcdn.com/w320/tc.png
127	República de Nauru	https://flagcdn.com/w320/nr.png
128	Territorio de los (Keeling) Islas Cocos	https://flagcdn.com/w320/cc.png
129	República Árabe Saharaui Democrática	https://flagcdn.com/w320/eh.png
130	Mancomunidad de Dominica	https://flagcdn.com/w320/dm.png
131	República de Costa Rica	https://flagcdn.com/w320/cr.png
132	Mancomunidad de Australia	https://flagcdn.com/w320/au.png
133	Reino de Tailandia	https://flagcdn.com/w320/th.png
134	República de Haití	https://flagcdn.com/w320/ht.png
135	Tuvalu	https://flagcdn.com/w320/tv.png
136	República de Honduras	https://flagcdn.com/w320/hn.png
137	República de Guinea Ecuatorial	https://flagcdn.com/w320/gq.png
138	Santa Lucía	https://flagcdn.com/w320/lc.png
139	Polinesia francés	https://flagcdn.com/w320/pf.png
140	República de Belarús	https://flagcdn.com/w320/by.png
141	República de Letonia	https://flagcdn.com/w320/lv.png
142	República de Palau	https://flagcdn.com/w320/pw.png
143	Guadalupe	https://flagcdn.com/w320/gp.png
144	República de las Filipinas	https://flagcdn.com/w320/ph.png
145	Gibraltar	https://flagcdn.com/w320/gi.png
146	Reino de Dinamarca	https://flagcdn.com/w320/dk.png
147	República de Camerún	https://flagcdn.com/w320/cm.png
148	República de Guinea	https://flagcdn.com/w320/gn.png
149	Reino de Bahrein	https://flagcdn.com/w320/bh.png
150	República de Suriname	https://flagcdn.com/w320/sr.png
151	República Democrática del Congo	https://flagcdn.com/w320/cd.png
152	República Federal de Somalia	https://flagcdn.com/w320/so.png
153	República Checa	https://flagcdn.com/w320/cz.png
154	nueva Caledonia	https://flagcdn.com/w320/nc.png
155	República de Vanuatu	https://flagcdn.com/w320/vu.png
156	Santa Elena, Ascensión y Tristán de Acuña	https://flagcdn.com/w320/sh.png
157	República de Togo	https://flagcdn.com/w320/tg.png
158	Islas Vírgenes	https://flagcdn.com/w320/vg.png
159	República de Kenya	https://flagcdn.com/w320/ke.png
160	Niue	https://flagcdn.com/w320/nu.png
161	Islas Heard y McDonald	https://flagcdn.com/w320/hm.png
162	República de Rwanda	https://flagcdn.com/w320/rw.png
163	República de Estonia	https://flagcdn.com/w320/ee.png
164	Rumania	https://flagcdn.com/w320/ro.png
165	República de Trinidad y Tobago	https://flagcdn.com/w320/tt.png
166	República Cooperativa de Guyana	https://flagcdn.com/w320/gy.png
167	República Democrática de Timor-Leste	https://flagcdn.com/w320/tl.png
168	República Socialista de Vietnam	https://flagcdn.com/w320/vn.png
169	República Oriental del Uruguay	https://flagcdn.com/w320/uy.png
170	Ciudad del Vaticano	https://flagcdn.com/w320/va.png
171	Hong Kong Región Administrativa Especial de la República Popular China	https://flagcdn.com/w320/hk.png
172	República de Austria	https://flagcdn.com/w320/at.png
173	Antigua y Barbuda	https://flagcdn.com/w320/ag.png
174	Turkmenistán	https://flagcdn.com/w320/tm.png
175	República de Mozambique	https://flagcdn.com/w320/mz.png
176	República de Panamá	https://flagcdn.com/w320/pa.png
177	Estados Federados de Micronesia	https://flagcdn.com/w320/fm.png
178	República de Irlanda	https://flagcdn.com/w320/ie.png
179	País de Curazao	https://flagcdn.com/w320/cw.png
180	Guayana	https://flagcdn.com/w320/gf.png
181	Reino de Noruega	https://flagcdn.com/w320/no.png
182	Islas Åland	https://flagcdn.com/w320/ax.png
183	República Centroafricana	https://flagcdn.com/w320/cf.png
184	Burkina Faso	https://flagcdn.com/w320/bf.png
185	Estado de Eritrea	https://flagcdn.com/w320/er.png
186	República Unida de Tanzania	https://flagcdn.com/w320/tz.png
187	República de Corea	https://flagcdn.com/w320/kr.png
188	Reino Hachemita de Jordania	https://flagcdn.com/w320/jo.png
189	República Islámica de Mauritania	https://flagcdn.com/w320/mr.png
190	República de Lituania	https://flagcdn.com/w320/lt.png
191	Estados Unidos Islas menores alejadas de	https://flagcdn.com/w320/um.png
192	República Eslovaca	https://flagcdn.com/w320/sk.png
193	República de Angola	https://flagcdn.com/w320/ao.png
194	República de Kazajstán	https://flagcdn.com/w320/kz.png
195	República de Moldova	https://flagcdn.com/w320/md.png
196	República de Malí	https://flagcdn.com/w320/ml.png
197	islas Malvinas	https://flagcdn.com/w320/fk.png
198	República de Armenia	https://flagcdn.com/w320/am.png
199	Estado Independiente de Samoa	https://flagcdn.com/w320/ws.png
200	Bailía de Jersey	https://flagcdn.com/w320/je.png
201	Japón	https://flagcdn.com/w320/jp.png
202	Estado Plurinacional de Bolivia	https://flagcdn.com/w320/bo.png
203	República de Chile	https://flagcdn.com/w320/cl.png
204	Estados Unidos de América	https://flagcdn.com/w320/us.png
205	San Vicente y las Granadinas	https://flagcdn.com/w320/vc.png
206	Bermuda	https://flagcdn.com/w320/bm.png
207	República de las Seychelles	https://flagcdn.com/w320/sc.png
208	Territorio Británico del Océano Índico	https://flagcdn.com/w320/io.png
209	República de Guatemala	https://flagcdn.com/w320/gt.png
210	República del Ecuador	https://flagcdn.com/w320/ec.png
211	Martinica	https://flagcdn.com/w320/mq.png
212	República de Tayikistán	https://flagcdn.com/w320/tj.png
213	República de Malta	https://flagcdn.com/w320/mt.png
214	República de Gambia	https://flagcdn.com/w320/gm.png
215	República Federal de Nigeria	https://flagcdn.com/w320/ng.png
216	Commonwealth de las Bahamas	https://flagcdn.com/w320/bs.png
217	República de Kosovo	https://flagcdn.com/w320/xk.png
218	Estado de Kuwait	https://flagcdn.com/w320/kw.png
219	República de las Maldivas	https://flagcdn.com/w320/mv.png
220	República de Sudán del Sur	https://flagcdn.com/w320/ss.png
221	República Islámica de Irán	https://flagcdn.com/w320/ir.png
222	República de Albania	https://flagcdn.com/w320/al.png
223	República Federativa del Brasil	https://flagcdn.com/w320/br.png
224	República de Serbia	https://flagcdn.com/w320/rs.png
225	Belice	https://flagcdn.com/w320/bz.png
226	República de la Unión de Myanmar	https://flagcdn.com/w320/mm.png
227	Reino de Bután	https://flagcdn.com/w320/bt.png
228	República Bolivariana de Venezuela	https://flagcdn.com/w320/ve.png
229	República de Liberia	https://flagcdn.com/w320/lr.png
230	Jamaica	https://flagcdn.com/w320/jm.png
231	República de Polonia	https://flagcdn.com/w320/pl.png
232	Islas Caimán	https://flagcdn.com/w320/ky.png
233	Nación de Brunei, Morada de la Paz	https://flagcdn.com/w320/bn.png
234	Unión de las Comoras	https://flagcdn.com/w320/km.png
235	Guam	https://flagcdn.com/w320/gu.png
236	Reino de Tonga	https://flagcdn.com/w320/to.png
237	República Independiente y Soberano de Kiribati	https://flagcdn.com/w320/ki.png
238	República de Ghana	https://flagcdn.com/w320/gh.png
239	República de Chad	https://flagcdn.com/w320/td.png
240	República de Zimbabue	https://flagcdn.com/w320/zw.png
241	Saint Martin	https://flagcdn.com/w320/mf.png
242	Mongolia	https://flagcdn.com/w320/mn.png
243	República Portuguesa	https://flagcdn.com/w320/pt.png
244	Samoa Americana	https://flagcdn.com/w320/as.png
245	República del Congo	https://flagcdn.com/w320/cg.png
246	Reino de Bélgica	https://flagcdn.com/w320/be.png
247	Estado de Israel	https://flagcdn.com/w320/il.png
248	nueva Zelanda	https://flagcdn.com/w320/nz.png
249	República de Nicaragua	https://flagcdn.com/w320/ni.png
250	Anguila	https://flagcdn.com/w320/ai.png
\.


--
-- Data for Name: Ejemplos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ejemplos" (id, name, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Genres" (id, name) FROM stdin;
\.


--
-- Data for Name: MovieGenres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MovieGenres" ("movieId", "genreId") FROM stdin;
\.


--
-- Data for Name: Movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Movies" (id, title, "originalTitle", "otherTitles", year, director, "cast", companies, genres, synopsis, image, "countryId") FROM stdin;
3	Planeta de recolectores	Scavengers Reign	{}	2023	Joseph Bennett (Creador), Charles Huettner (Creador), Joe Bennett, Charles Huettner, Benjy Brooke, Vincent Tsui, Jonathan Djob-Nkondo, Diego Porral, Rachel Reid, Christine Jie-Eun Shin		Titmouse, Green Street Pictures, HBO Max, Max, Chris Prynoski, HBO Max	Serie de TV, Animación, Ciencia ficción, Drama, Aventuras, Aventura espacial, Animación para adultos	Serie de TV (2023). 1 temporada. 12 episodios. La tripulación superviviente de un buque de carga averiado en el profundo espacio queda varada en un planeta hermoso pero inclemente. Empiezan a conocer la verdadera naturaleza de este planeta mientras intentan sobrevivir para escapar o ser rescatados. Cancelada tras su primera temporada.	https://pics.filmaffinity.com/scavengers_reign-792901372-mmed.jpg	250
4	Los imperdonables	Unforgiven	{}	1992	Clint Eastwood		Warner Bros., Malpaso Productions	Western, Drama, Venganza, Vejez / Madurez	William Munny (Clint Eastwood) es un pistolero retirado, viudo y padre de familia, que tiene dificultades económicas para sacar adelante a su hijos. Su única salida es hacer un último trabajo. En compañía de un viejo colega (Morgan Freeman) y de un joven inexperto (Jaimz Woolvett), Munny tendrá que matar a dos hombres que cortaron la cara a una prostituta. (FILMAFFINITY)	https://pics.filmaffinity.com/unforgiven-854755790-mmed.jpg	250
5	Se levanta el viento	Kaze tachinu	{}	2013	Hayao Miyazaki	Animación	Studio Ghibli	Animación, Drama, Biográfico, Aviones, II Guerra Mundial, Años 20, Años 30, Manga, Terremotos, Drama psicológico, Animación para adultos	Jiro Horikoshi, que sueña con volar y diseñar hermosos aviones, se inspira en el famoso diseñador aeronáutico italiano Caproni. Corto de vista desde niño y por ello incapaz de volar, se une a la división aeronáutica de una compañía de ingeniería en 1927. Su genio pronto es reconocido y se convierte en uno de los más prestigiosos diseñadores aeronáuticos. Film biográfico que recrea hechos históricos que marcaron su vida, como el terremoto de Kanto de 1923, la Gran Depresión, la epidemia de tuberculosis y la entrada de Japón en la Segunda Guerra Mundial.	https://pics.filmaffinity.com/kaze_tachinu-603357491-mmed.jpg	201
6	Nadie podrá salvarte	No One Will Save You	{}	2023	Brian Duffield		Star Thrower Entertainment, 20th Century Studios, Hulu, Disney+	Terror, Ciencia ficción, Thriller, Extraterrestres, Home Invasion	Brynn es una joven brillante que vive aislada de un vecindario que la ha apartado. Solitaria pero optimista, encuentra consuelo en la casa donde creció, hasta que unos extraños ruidos la despiertan. Proceden de intrusos que parecen ser sobrenaturales. Brynn se enfrenta a extraterrestres que amenazan su futuro y la obligan a enfrentarse a su pasado. (FILMAFFINITY)	https://pics.filmaffinity.com/no_one_will_save_you-111620642-mmed.jpg	204
7	Invencible	Invincible	{}	2021	Robert Kirkman (Creador), Cory Walker (Creador), Jeff Allen, Robert Valley, William Ruzicka		Amazon MGM Studios, Image Comics, Skybound Entertainment, Prime Video	Serie de TV, Animación, Acción, Fantástico, Animación para adultos, Superhéroes, Cómic	Serie de TV (2021-2025). 3 temporadas, 24 episodios. Cuando Mark Grayson hereda superpoderes con 17 años, se convierte en uno de los superhéroes más grandes de la Tierra, junto con su padre. Todos sus sueños anhelados desde que era niño se hacen realidad... hasta que sucede algo que lo cambia todo. (FILMAFFINITY)	https://pics.filmaffinity.com/invincible-673129857-mmed.jpg	204
12	Troya	Troy	{}	2004	Wolfgang Petersen		Warner Bros., Plan B Entertainment, Radiant Productions, Helena Productions, Latina Pictures, Nimar Studios, Warner Bros.	Aventuras, Acción, Romance, Antigua Grecia, Cine épico, Mitología	En el año 1193 A.C. el joven Paris (Orlando Bloom), hijo de Príamo y príncipe de Troya, rapta a su amada Helena (Diane Kruger), esposa de Menelao, el rey de Esparta, lo que desencadena la Guerra de Troya, en la que se enfrentan griegos y troyanos. Comienza entonces el asedio de la ciudad de Troya por parte del ejército griego, que duraría más de diez años. Aquiles (Brad Pitt) era el gran héroe de los griegos, mientras Héctor (Eric Bana), el hijo mayor de Príamo (Peter O'Toole), el rey de Troya, representaba la única esperanza de salvación para la ciudad.	https://pics.filmaffinity.com/troy-509263865-mmed.jpg	204
14	El hombre elefante	The Elephant Man	{}	1980	David Lynch		Paramount Pictures, Jonathan Sanger, Mel Brooks	Drama, Biográfico, Enfermedad, Discapacidad, Siglo XIX, Película de culto	A finales del siglo XIX, el doctor Frederick Treves descubre en un circo a un hombre llamado John Merrick. Se trata de un ciudadano británico con la cabeza monstruosamente deformada, que vive en una situación de constante humillación y sufrimiento al ser exhibido diariamente como una atracción de feria. (FILMAFFINITY)	https://pics.filmaffinity.com/the_elephant_man-250132787-mmed.jpg	204
15	El aviador	The Aviator	{}	2004	Martin Scorsese		Miramax, Warner Bros., Forward Pass, Appian Way, IEG Virtual Studios, IMF Internationale Medien und Film GmbH 3, Mel's Cite du Cinema, Cappa Productions, Michael Mann	Drama, Biográfico, Cine dentro del cine, Aviones, Años 20, Años 30, Años 40	Biografía del polifacético Howard Hughes, un hombre que con el poco dinero que heredó de su padre se trasladó a Hollywood, donde amasó un gran fortuna. Fue uno de los productores más destacados del cine americano durante las décadas de los treinta y los cuarenta. Lanzó al estrellato a actrices como Jean Harlow y llegó a ser dueño de la RKO Radio Pictures. Pero Hughes, además de productor, fue un gran industrial y comerciante que desempeñó un importante papel por sus innovaciones en el mundo de la aviación. (FILMAFFINITY)	https://pics.filmaffinity.com/the_aviator-398480570-mmed.jpg	204
16	Iluminados por el fuego	Iluminados por el fuego	{}	2005	Tristán Bauer		Universidad Nacional de General San Martín, Gobierno de la Provincia de San Luis, Canal+ España, San Luis Cine, Gobierno de la Provincia de Santa Cruz, INCAA	Bélico, Drama, Guerra de las Malvinas, Ejército, Años 80	"Iluminados por el fuego" narra los recuerdos de Esteban Leguizamón, un hombre de 40 años que, en 1982 y cuando tenía sólo 18, fue llevado como soldado recluta a combatir a las Islas Malvinas. A partir del intento de suicidio de uno de sus excompañeros, Esteban se sumerge en los recuerdos de esa guerra que compartió con otros dos jóvenes reclutas: Vargas, el suicida, y Juan, muerto en combate. Allí aparecen no sólo los horrores propios de la guerra y el padecimiento del frío y del hambre, sino también las historias de amistad y compañerismo. Desde la mirada de Esteban, la película pone en evidencia la lenta y gradual inmersión de sus frágiles vidas en el corazón de la muerte misma. A los 20 años de la guerra, Esteban decide volver a las Islas para reencontrarse con su pasado y cerrar sus viejas heridas. (FILMAFFINITY)	https://pics.filmaffinity.com/iluminados_por_el_fuego-314900268-mmed.jpg	125
17	El pianista	The Pianist (Le Pianiste)	{}	2002	Roman Polanski		R.P. Productions, Heritage Films, Studio Babelsberg, Runteam Ltd	Drama, II Guerra Mundial, Nazismo, Holocausto, Música, Biográfico, Histórico	Wladyslaw Szpilman, un brillante pianista polaco de origen judío, vive con su familia en el ghetto de Varsovia. Cuando, en 1939, los alemanes invaden Polonia, consigue evitar la deportación gracias a la ayuda de algunos amigos. Pero tendrá que vivir escondido y completamente aislado durante mucho tiempo, y para sobrevivir tendrá que afrontar constantes peligros. (FILMAFFINITY)	https://pics.filmaffinity.com/the_pianist_le_pianiste-978132965-mmed.jpg	48
18	Better Man: La historia de Robbie Williams	Better Man	{}	2024	Michael Gracey		Footloose Productions, Lost Bandits, Rocket Science, Partizan, VicScreen, Zero Gravity Management, Sina Studios, Facing East Entertainment	Musical, Drama, Biográfico, Música	La historia de Robbie Williams, uno de los mejores artistas del mundo, las experiencias que lo convirtieron en quien es y los demonios con los que luchó tanto dentro como fuera del escenario. (FILMAFFINITY)	https://pics.filmaffinity.com/better_man-620220109-mmed.jpg	48
19	El último rey de Escocia	The Last King of Scotland	{}	2006	Kevin Macdonald		Fox Searchlight, DNA Films, Filmfour, UK Film Council, Scottish Arts Council Lottery Fund	Drama, África, Política, Basado en hechos reales, Años 70	En el año 1970, por caprichos del destino, el joven médico escocés Dr. Nicholas Garrigan (James McAvoy) acaba ejerciendo su profesión en Uganda, un país del que no sabía nada, y allí se ve irreversiblemente unido a un temible personaje: Idi Amin (Forest Whitaker), el reciente nombrado presidente del país africano que comienza a gobernar de forma cruel y sanguinaria. Garrigan comienza a ser el médico personal de un dictador del que se dijo que llegó a practicar el canibalismo. (FILMAFFINITY)	https://pics.filmaffinity.com/the_last_king_of_scotland-974287116-mmed.jpg	48
\.


--
-- Data for Name: UserMovies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserMovies" (id, watched, "watchedDate", "rewatchedDate", type, note, "recommendationSource", "selectOriginalTitle", "userId", "movieId", "currentActive") FROM stdin;
316	No	\N	{}	Película	Scavengers Reign		t	2	3	t
313	No	\N	{}	Película			t	2	4	t
320	Si	\N	{}	Película			t	2	6	t
319	Si	\N	{}	Película	Análisis: https://www.youtube.com/watch?v=W4h_T_pzKoE		t	2	12	t
318	Si	\N	{}	Película	hola		t	2	7	t
321	No	\N	{}	Película			t	2	14	t
317	Si	\N	{}	Película			t	2	5	t
322	No	\N	{}	Película			t	2	15	t
323	No	\N	{}	Película		https://x.com/i/status/1908880677900001680	t	2	16	t
324	Si	\N	{}	Película	https://www.youtube.com/watch?v=l_gkCZsW7o8		t	2	17	t
325	No	\N	{}	Película	https://www.youtube.com/watch?v=M_UC7zcNm58		t	2	18	t
326	Si	\N	{}	Película			t	2	19	t
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, username, email, password, "firstName", "lastName", "profilePicture", "isAdmin", "isActive", "createdAt", "updatedAt") FROM stdin;
2	Mauricio	mauriciotejada14@gmail.com	$2b$10$xp9uhfP60BSNEQn9/SCBLucAuVhcA3.6iAGnG5M7hHNgQQKDj3BGS	Mauricio	Tejada	\N	f	t	2025-03-27 14:24:12.907-03	2025-03-27 14:24:12.907-03
\.


--
-- Data for Name: ejemplos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ejemplos (id, nombre, descripcion, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: Countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Countries_id_seq"', 250, true);


--
-- Name: Ejemplos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ejemplos_id_seq"', 1, false);


--
-- Name: Genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Genres_id_seq"', 1, false);


--
-- Name: Movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Movies_id_seq"', 19, true);


--
-- Name: UserMovies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserMovies_id_seq"', 326, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 2, true);


--
-- Name: ejemplos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ejemplos_id_seq', 1, false);


--
-- Name: Countries Countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Countries"
    ADD CONSTRAINT "Countries_pkey" PRIMARY KEY (id);


--
-- Name: Ejemplos Ejemplos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ejemplos"
    ADD CONSTRAINT "Ejemplos_pkey" PRIMARY KEY (id);


--
-- Name: Genres Genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Genres"
    ADD CONSTRAINT "Genres_pkey" PRIMARY KEY (id);


--
-- Name: Movies Movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movies"
    ADD CONSTRAINT "Movies_pkey" PRIMARY KEY (id);


--
-- Name: UserMovies UserMovies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserMovies"
    ADD CONSTRAINT "UserMovies_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_email_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key1" UNIQUE (email);


--
-- Name: Users Users_email_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key10" UNIQUE (email);


--
-- Name: Users Users_email_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key11" UNIQUE (email);


--
-- Name: Users Users_email_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key12" UNIQUE (email);


--
-- Name: Users Users_email_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key13" UNIQUE (email);


--
-- Name: Users Users_email_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key14" UNIQUE (email);


--
-- Name: Users Users_email_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key15" UNIQUE (email);


--
-- Name: Users Users_email_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key16" UNIQUE (email);


--
-- Name: Users Users_email_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key17" UNIQUE (email);


--
-- Name: Users Users_email_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key18" UNIQUE (email);


--
-- Name: Users Users_email_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key19" UNIQUE (email);


--
-- Name: Users Users_email_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key2" UNIQUE (email);


--
-- Name: Users Users_email_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key20" UNIQUE (email);


--
-- Name: Users Users_email_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key21" UNIQUE (email);


--
-- Name: Users Users_email_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key22" UNIQUE (email);


--
-- Name: Users Users_email_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key23" UNIQUE (email);


--
-- Name: Users Users_email_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key24" UNIQUE (email);


--
-- Name: Users Users_email_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key25" UNIQUE (email);


--
-- Name: Users Users_email_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key26" UNIQUE (email);


--
-- Name: Users Users_email_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key27" UNIQUE (email);


--
-- Name: Users Users_email_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key28" UNIQUE (email);


--
-- Name: Users Users_email_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key29" UNIQUE (email);


--
-- Name: Users Users_email_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key3" UNIQUE (email);


--
-- Name: Users Users_email_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key30" UNIQUE (email);


--
-- Name: Users Users_email_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key31" UNIQUE (email);


--
-- Name: Users Users_email_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key32" UNIQUE (email);


--
-- Name: Users Users_email_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key33" UNIQUE (email);


--
-- Name: Users Users_email_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key34" UNIQUE (email);


--
-- Name: Users Users_email_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key35" UNIQUE (email);


--
-- Name: Users Users_email_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key36" UNIQUE (email);


--
-- Name: Users Users_email_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key37" UNIQUE (email);


--
-- Name: Users Users_email_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key38" UNIQUE (email);


--
-- Name: Users Users_email_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key39" UNIQUE (email);


--
-- Name: Users Users_email_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key4" UNIQUE (email);


--
-- Name: Users Users_email_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key40" UNIQUE (email);


--
-- Name: Users Users_email_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key41" UNIQUE (email);


--
-- Name: Users Users_email_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key42" UNIQUE (email);


--
-- Name: Users Users_email_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key43" UNIQUE (email);


--
-- Name: Users Users_email_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key44" UNIQUE (email);


--
-- Name: Users Users_email_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key45" UNIQUE (email);


--
-- Name: Users Users_email_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key46" UNIQUE (email);


--
-- Name: Users Users_email_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key47" UNIQUE (email);


--
-- Name: Users Users_email_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key48" UNIQUE (email);


--
-- Name: Users Users_email_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key49" UNIQUE (email);


--
-- Name: Users Users_email_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key5" UNIQUE (email);


--
-- Name: Users Users_email_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key50" UNIQUE (email);


--
-- Name: Users Users_email_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key51" UNIQUE (email);


--
-- Name: Users Users_email_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key52" UNIQUE (email);


--
-- Name: Users Users_email_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key53" UNIQUE (email);


--
-- Name: Users Users_email_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key54" UNIQUE (email);


--
-- Name: Users Users_email_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key55" UNIQUE (email);


--
-- Name: Users Users_email_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key56" UNIQUE (email);


--
-- Name: Users Users_email_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key57" UNIQUE (email);


--
-- Name: Users Users_email_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key58" UNIQUE (email);


--
-- Name: Users Users_email_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key59" UNIQUE (email);


--
-- Name: Users Users_email_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key6" UNIQUE (email);


--
-- Name: Users Users_email_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key60" UNIQUE (email);


--
-- Name: Users Users_email_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key61" UNIQUE (email);


--
-- Name: Users Users_email_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key62" UNIQUE (email);


--
-- Name: Users Users_email_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key63" UNIQUE (email);


--
-- Name: Users Users_email_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key64" UNIQUE (email);


--
-- Name: Users Users_email_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key65" UNIQUE (email);


--
-- Name: Users Users_email_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key66" UNIQUE (email);


--
-- Name: Users Users_email_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key67" UNIQUE (email);


--
-- Name: Users Users_email_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key68" UNIQUE (email);


--
-- Name: Users Users_email_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key7" UNIQUE (email);


--
-- Name: Users Users_email_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key8" UNIQUE (email);


--
-- Name: Users Users_email_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key9" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


--
-- Name: Users Users_username_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key1" UNIQUE (username);


--
-- Name: Users Users_username_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key10" UNIQUE (username);


--
-- Name: Users Users_username_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key11" UNIQUE (username);


--
-- Name: Users Users_username_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key12" UNIQUE (username);


--
-- Name: Users Users_username_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key13" UNIQUE (username);


--
-- Name: Users Users_username_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key14" UNIQUE (username);


--
-- Name: Users Users_username_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key15" UNIQUE (username);


--
-- Name: Users Users_username_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key16" UNIQUE (username);


--
-- Name: Users Users_username_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key17" UNIQUE (username);


--
-- Name: Users Users_username_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key18" UNIQUE (username);


--
-- Name: Users Users_username_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key19" UNIQUE (username);


--
-- Name: Users Users_username_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key2" UNIQUE (username);


--
-- Name: Users Users_username_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key20" UNIQUE (username);


--
-- Name: Users Users_username_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key21" UNIQUE (username);


--
-- Name: Users Users_username_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key22" UNIQUE (username);


--
-- Name: Users Users_username_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key23" UNIQUE (username);


--
-- Name: Users Users_username_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key24" UNIQUE (username);


--
-- Name: Users Users_username_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key25" UNIQUE (username);


--
-- Name: Users Users_username_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key26" UNIQUE (username);


--
-- Name: Users Users_username_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key27" UNIQUE (username);


--
-- Name: Users Users_username_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key28" UNIQUE (username);


--
-- Name: Users Users_username_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key29" UNIQUE (username);


--
-- Name: Users Users_username_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key3" UNIQUE (username);


--
-- Name: Users Users_username_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key30" UNIQUE (username);


--
-- Name: Users Users_username_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key31" UNIQUE (username);


--
-- Name: Users Users_username_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key32" UNIQUE (username);


--
-- Name: Users Users_username_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key33" UNIQUE (username);


--
-- Name: Users Users_username_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key34" UNIQUE (username);


--
-- Name: Users Users_username_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key35" UNIQUE (username);


--
-- Name: Users Users_username_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key36" UNIQUE (username);


--
-- Name: Users Users_username_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key37" UNIQUE (username);


--
-- Name: Users Users_username_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key38" UNIQUE (username);


--
-- Name: Users Users_username_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key39" UNIQUE (username);


--
-- Name: Users Users_username_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key4" UNIQUE (username);


--
-- Name: Users Users_username_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key40" UNIQUE (username);


--
-- Name: Users Users_username_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key41" UNIQUE (username);


--
-- Name: Users Users_username_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key42" UNIQUE (username);


--
-- Name: Users Users_username_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key43" UNIQUE (username);


--
-- Name: Users Users_username_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key44" UNIQUE (username);


--
-- Name: Users Users_username_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key45" UNIQUE (username);


--
-- Name: Users Users_username_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key46" UNIQUE (username);


--
-- Name: Users Users_username_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key47" UNIQUE (username);


--
-- Name: Users Users_username_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key48" UNIQUE (username);


--
-- Name: Users Users_username_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key49" UNIQUE (username);


--
-- Name: Users Users_username_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key5" UNIQUE (username);


--
-- Name: Users Users_username_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key50" UNIQUE (username);


--
-- Name: Users Users_username_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key51" UNIQUE (username);


--
-- Name: Users Users_username_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key52" UNIQUE (username);


--
-- Name: Users Users_username_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key53" UNIQUE (username);


--
-- Name: Users Users_username_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key54" UNIQUE (username);


--
-- Name: Users Users_username_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key55" UNIQUE (username);


--
-- Name: Users Users_username_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key56" UNIQUE (username);


--
-- Name: Users Users_username_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key57" UNIQUE (username);


--
-- Name: Users Users_username_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key58" UNIQUE (username);


--
-- Name: Users Users_username_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key59" UNIQUE (username);


--
-- Name: Users Users_username_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key6" UNIQUE (username);


--
-- Name: Users Users_username_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key60" UNIQUE (username);


--
-- Name: Users Users_username_key61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key61" UNIQUE (username);


--
-- Name: Users Users_username_key62; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key62" UNIQUE (username);


--
-- Name: Users Users_username_key63; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key63" UNIQUE (username);


--
-- Name: Users Users_username_key64; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key64" UNIQUE (username);


--
-- Name: Users Users_username_key65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key65" UNIQUE (username);


--
-- Name: Users Users_username_key66; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key66" UNIQUE (username);


--
-- Name: Users Users_username_key67; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key67" UNIQUE (username);


--
-- Name: Users Users_username_key68; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key68" UNIQUE (username);


--
-- Name: Users Users_username_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key7" UNIQUE (username);


--
-- Name: Users Users_username_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key8" UNIQUE (username);


--
-- Name: Users Users_username_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key9" UNIQUE (username);


--
-- Name: ejemplos ejemplos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ejemplos
    ADD CONSTRAINT ejemplos_pkey PRIMARY KEY (id);


--
-- Name: MovieGenres MovieGenres_genreId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MovieGenres"
    ADD CONSTRAINT "MovieGenres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES public."Genres"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MovieGenres MovieGenres_movieId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MovieGenres"
    ADD CONSTRAINT "MovieGenres_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public."Movies"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Movies Movies_countryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movies"
    ADD CONSTRAINT "Movies_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES public."Countries"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: UserMovies UserMovies_movieId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserMovies"
    ADD CONSTRAINT "UserMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public."Movies"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserMovies UserMovies_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserMovies"
    ADD CONSTRAINT "UserMovies_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

