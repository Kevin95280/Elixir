--
-- PostgreSQL database dump
--

\restrict eylPmYwDm3U8vOcFJdUHhqmqAIgdTh1dnqdCqiYBwJCeJZjBJ9hMSpiAoyZuuE5

-- Dumped from database version 14.20 (Ubuntu 14.20-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.20 (Ubuntu 14.20-0ubuntu0.22.04.1)

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
-- Name: bottle; Type: TABLE; Schema: public; Owner: keks
--

CREATE TABLE public.bottle (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    year integer,
    type character varying(255),
    owner character varying(255),
    link text,
    img text,
    alt text,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.bottle OWNER TO keks;

--
-- Name: bottle_id_seq; Type: SEQUENCE; Schema: public; Owner: keks
--

CREATE SEQUENCE public.bottle_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bottle_id_seq OWNER TO keks;

--
-- Name: bottle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: keks
--

ALTER SEQUENCE public.bottle_id_seq OWNED BY public.bottle.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: keks
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(32) NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL,
    is_active boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "resetToken" text,
    "resetTokenExpire" timestamp without time zone
);


ALTER TABLE public."user" OWNER TO keks;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: keks
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO keks;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: keks
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: bottle id; Type: DEFAULT; Schema: public; Owner: keks
--

ALTER TABLE ONLY public.bottle ALTER COLUMN id SET DEFAULT nextval('public.bottle_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: keks
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: bottle; Type: TABLE DATA; Schema: public; Owner: keks
--

COPY public.bottle (id, name, year, type, owner, link, img, alt, "userId", "createdAt", "updatedAt") FROM stdin;
1	Château Jaron Cuvée Puy Berton Bordeaux	2019	Rouge		https://www.vivino.com/FR/fr/chateau-jaron-cuvee-puy-berton-bordeaux-bordeaux-red-wine-v-rt6qn/w/11681254?year=2019	https://www.winewarehouse.my/wp-content/uploads/2025/02/ChateauJaron.png	Château Jaron Cuvée Puy Berton Bordeaux	1	2025-12-09 19:15:56.108+01	2025-12-09 19:15:56.108+01
2	Domaines Roland Dumas Château Lalibarde Côtes de Bourg	2011	Rouge		https://www.vivino.com/FR/fr/domaines-roland-dumas-chateau-lalibarde-cotes-de-bourg/w/2631840?year=2011	https://images.vivino.com/thumbs/ZgwrMw5RRamp1xbIHbvnqg_pb_x960.png	Domaines Roland Dumas Château Lalibarde Côtes de Bourg	1	2025-12-09 19:15:56.108+01	2025-12-09 19:15:56.108+01
3	Domenico Pennacchi Terre di Capitani Montefalco Riserva Rosso	2011	Rouge		https://www.vivino.com/FR/fr/domenico-pennacchi-pennacchi-terre-di-capitani-riseva-montefalco-rosso/w/1246780?year=2011	https://images.vivino.com/thumbs/xhoO0aPpShGx5ewPf_Vy-Q_pb_x600.png	Domenico Pennacchi Terre di Capitani Montefalco Riserva Rosso	1	2025-12-09 19:15:56.108+01	2025-12-09 19:15:56.108+01
4	Caldora Montepulciano d'Abruzzo	2015	Rouge		https://www.vivino.com/FR/fr/caldora-montepulciano-d-abruzzo/w/11852?year=2015	https://images.vivino.com/thumbs/bdmNHkHJSomCxv85-f6Dpg_pb_x960.png	Caldora Montepulciano d'Abruzzo	1	2025-12-09 19:15:56.108+01	2025-12-09 19:15:56.108+01
5	Alto Pina Reserva Branco	2022	Blanc		https://www.vivino.com/FR/fr/alto-pina-reserva-branco/w/5742216?year=2022	https://images.vivino.com/thumbs/14vNkBC4SaKI_O14i43yOQ_pb_x960.png	Alto Pina Reserva Branco	1	2025-12-09 19:15:56.108+01	2025-12-09 19:15:56.108+01
11	Givry 1er Cru Les Vieilles Vignes	2021	Blanc	Michel Sarrazin	https://www.vivino.com/fr/michel-sarrazin-givry-1er-cru-les-vieilles-vignes/w/1796808?year=2021	https://images.vivino.com/thumbs/jRZ8gk3TQ_GAmnxZe0jjdw_pb_x600.png	Givry 1er Cru Les Vieilles Vignes	1	2026-01-07 15:33:30.327+01	2026-01-07 15:33:30.327+01
12	Château Charmail	2014	Rouge		https://www.vivino.com/fr/chateau-charmail-haut-medoc/w/1099372?year=2014	https://images.vivino.com/thumbs/s_n2S3lZRG6V9veuQ3xAnA_pb_x600.png	Château Charmail 2014	1	2026-01-07 15:43:04.391+01	2026-01-07 15:43:04.391+01
14	Les Charmes de Grand Corbin Saint-Émilion Grand Cru	2009	Rouge	Château Grand Corbin	https://www.vivino.com/fr/grand-corbin-les-charmes-de-grand-corbin-saint-emilion-grand-cru/w/2307071?year=2009	https://images.vivino.com/thumbs/5qJyZiSKTTGKDVc-vDQ-GQ_pb_x600.png	Les Charmes de Grand Corbin Saint-Émilion Grand Cru	1	2026-01-07 16:23:48.278+01	2026-01-07 16:23:48.278+01
15	Les Demoiselles de Larrivet Haut-Brion	2015	Rouge	Château Larrivet Haut-Brion	https://www.vivino.com/fr/chateau-larrivet-haut-brion-les-demoiselles-pessac-leognan/w/1127509?year=2015	https://images.vivino.com/thumbs/jdNg6qA3Rf6zs7D7LsgOFw_pb_x600.png	Les Demoiselles de Larrivet Haut-Brion 2015	1	2026-01-07 16:31:49.014+01	2026-01-07 16:31:49.014+01
16	Coutada Velha	2021	Rouge		https://www.vivino.com/fr/coutada-velha-signature-tinto/w/5807441?year=2021	https://images.vivino.com/thumbs/EyU_Sh8LSB29oVMR0mIr5A_pb_x600.png	Coutada Velha 2021	1	2026-01-08 16:46:19.088+01	2026-01-08 16:46:19.088+01
18	Les Pensées de La Tour Carnet	2014	Rouge	Château La Tour Carnet	https://www.vivino.com/fr/chateau-la-tour-carnet-les-pensees-haut-medoc/w/5062792?year=2014	https://images.vivino.com/thumbs/M_scGcX-Rf2HP8JMatWObw_pb_x600.png	Les Pensées de La Tour Carnet 2014	1	2026-01-08 17:11:28.561+01	2026-01-08 17:11:28.561+01
7	La Romaine	2018	Blanc	Hervé Baudry - Domaine de Rome	https://www.vivino.com/fr/herve-baudry-la-romaine-sancerre/w/1861390?year=2018	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0YZhNHpcJY-Ep8FC1np0ZSJhZuXPQUiMkhdANVx26AQ&s	La Romaine - Sancerre	1	2026-01-07 13:26:37.769+01	2026-01-08 21:51:26.042+01
13	Château Malaire	2009	Rouge	Château Malaire	https://www.vivino.com/fr/malaire-grande-cuvee-reserve-medoc/w/4076372?year=2009	https://images.vivino.com/thumbs/YRTTm1IPRwSbBrQU_Q-Pgg_pb_x300.png	Château Malaire 2009	1	2026-01-07 16:04:02.444+01	2026-01-08 21:52:50.771+01
6	Vinhas de Pegões Barricas Novas	2019	Rouge	Coop. Agr. Santo Isidro de Pegões	https://www.vivino.com/fr/vinhas-de-pegoes-barricas-novas-reserva-terras-do-sado/w/10645489?srsltid=AfmBOoq3vF75zFZGLjm9SlfdEk1kbB3mSMYNdmI8ZG52VwSiUrRpDfVi	https://www.meininger.de/sites/meininger.de/files/fields/field_wein_bild/5557523.png	Vinhas de Pegões Barricas Novas	1	2026-01-07 12:59:46.131+01	2026-01-08 21:53:28.617+01
19	Château Guichot	2019	Rouge	Château Guichot	https://www.vivino.com/fr/chateau-guichot-bordeaux-rouge/w/1525592?year=2019	https://images.vivino.com/thumbs/yYIFw6ZxTnGKe8413xmKdg_pb_600x600.png	Château Guichot 2019	1	2026-01-08 18:02:26.267+01	2026-01-08 21:54:59.247+01
17	Nuits-Saint-Georges	2016	Rouge	Pierre Lamotte	https://www.vivino.com/fr/pierre-lamotte-nuits-saint-georges/w/3513301?year=2016	https://web-common.vivino.com/assets/bottleShot/fallback_1.png	Nuits-Saint-Georges 2016 Pierre Lamotte	1	2026-01-08 17:08:37.133+01	2026-01-08 22:02:59.845+01
22	Cuvée Hortense Entre-deux-Mers	2023	Blanc	Quancard Diffusion	https://www.vivino.com/fr/quancard-diffusion-cuvee-hortense-entre-deux-mers/w/1957559?srsltid=AfmBOop8NYL-e8xBXfm5mITKU46hGBqLgPxWnNHudVL727ATYkFlP_jF	https://media.e.leclerc/3701439603547_1	Cuvée Hortense Entre-deux-Mers 2023	2	2026-01-13 19:32:59.852+01	2026-01-13 19:32:59.852+01
29	Poças Lágrima	\N	Autre	Manuel D. Poças Junior (Vinhos), S.A.	https://www.winespiritus.com/fr/vins-fortifies/4508-pocas-lagrima-vin-de-porto-5600752190865.html?srsltid=AfmBOorGu5lBgTiQXy_agjLBtftF2Uf0XJxTuVBI6uoXTx_tw4rNr9qp	https://www.winespiritus.com/8207-thickbox_default/pocas-lagrima-vin-de-porto.jpg	Poças Lágrima - Vin de Porto	2	2026-01-20 12:34:35.334+01	2026-01-20 12:34:35.334+01
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: keks
--

COPY public."user" (id, username, email, password, is_active, "createdAt", "updatedAt", "resetToken", "resetTokenExpire") FROM stdin;
1	Kevin	coelhokev@ymail.com	$2b$10$oyTo.VkUBRBTi26EREwYaOBPDjOZZ7N0lRQnR/oHla7Sa7D/ntSOW	t	2026-01-13 13:16:52.953+01	2026-01-13 13:16:52.953+01	\N	\N
2	Test1	coelhokev@gmail.com	$2b$10$Sxz/9aC3zU8EIKcp4XkyVeZu4Qi6ny5nhJntNMopV41VAqNLXAD5W	t	2026-01-13 18:34:56.397+01	2026-01-17 19:33:52.251+01	\N	\N
\.


--
-- Name: bottle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: keks
--

SELECT pg_catalog.setval('public.bottle_id_seq', 30, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: keks
--

SELECT pg_catalog.setval('public.user_id_seq', 2, true);


--
-- Name: bottle bottle_pkey; Type: CONSTRAINT; Schema: public; Owner: keks
--

ALTER TABLE ONLY public.bottle
    ADD CONSTRAINT bottle_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: keks
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: keks
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user user_username_key; Type: CONSTRAINT; Schema: public; Owner: keks
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: bottle bottle_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: keks
--

ALTER TABLE ONLY public.bottle
    ADD CONSTRAINT bottle_userid_fkey FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict eylPmYwDm3U8vOcFJdUHhqmqAIgdTh1dnqdCqiYBwJCeJZjBJ9hMSpiAoyZuuE5

