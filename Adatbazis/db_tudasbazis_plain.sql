--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2024-11-12 17:34:24

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 220 (class 1259 OID 16579)
-- Name: Cimkek; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cimkek" (
    cimke_id integer NOT NULL,
    nev character varying(50)
);


ALTER TABLE public."Cimkek" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16587)
-- Name: Felhasznalo_aktivitasok; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Felhasznalo_aktivitasok" (
    aktivitas_id integer NOT NULL,
    felhasznalo_id integer,
    tudasanyag_id integer,
    aktivitas_tipus character varying(50),
    aktivitas_ido timestamp without time zone,
    reszletek text
);


ALTER TABLE public."Felhasznalo_aktivitasok" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16558)
-- Name: Felhasznalok; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Felhasznalok" (
    user_id integer NOT NULL,
    felhasznalonev character varying(100),
    email character varying(255),
    password_hash character varying(255),
    role character varying(50)
);


ALTER TABLE public."Felhasznalok" OWNER TO postgres;

--
-- TOC entry 4891 (class 0 OID 0)
-- Dependencies: 217
-- Name: COLUMN "Felhasznalok".user_id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Felhasznalok".user_id IS 'Egyedi felhasználó azonosító';


--
-- TOC entry 4892 (class 0 OID 0)
-- Dependencies: 217
-- Name: COLUMN "Felhasznalok".felhasznalonev; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Felhasznalok".felhasznalonev IS 'felhasználónév';


--
-- TOC entry 4893 (class 0 OID 0)
-- Dependencies: 217
-- Name: COLUMN "Felhasznalok".email; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Felhasznalok".email IS 'felhasználó emailje';


--
-- TOC entry 4894 (class 0 OID 0)
-- Dependencies: 217
-- Name: COLUMN "Felhasznalok".password_hash; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Felhasznalok".password_hash IS 'titkosított jelszó';


--
-- TOC entry 4895 (class 0 OID 0)
-- Dependencies: 217
-- Name: COLUMN "Felhasznalok".role; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Felhasznalok".role IS 'jogosultsági szint';


--
-- TOC entry 222 (class 1259 OID 16594)
-- Name: Jogosultsagok; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Jogosultsagok" (
    jogosultsag_id integer NOT NULL,
    tudasanyag_id integer,
    szerepkor character varying(50)
);


ALTER TABLE public."Jogosultsagok" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16572)
-- Name: Kategoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Kategoria" (
    kategoria_id integer NOT NULL,
    nev character varying(100),
    leiras text
);


ALTER TABLE public."Kategoria" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16601)
-- Name: Tudasanyag_Cimke; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tudasanyag_Cimke" (
    tudasanyag_id integer,
    cimke_id integer
);


ALTER TABLE public."Tudasanyag_Cimke" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16565)
-- Name: Tudasanyagok; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tudasanyagok" (
    tudasanyag_id integer NOT NULL,
    cim character varying(255),
    tartalom text,
    letrehozva timestamp without time zone,
    modositva timestamp without time zone,
    kategoria_id integer,
    letrehozva_altala integer
);


ALTER TABLE public."Tudasanyagok" OWNER TO postgres;

--
-- TOC entry 4882 (class 0 OID 16579)
-- Dependencies: 220
-- Data for Name: Cimkek; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cimkek" (cimke_id, nev) FROM stdin;
1	fontos
\.


--
-- TOC entry 4883 (class 0 OID 16587)
-- Dependencies: 221
-- Data for Name: Felhasznalo_aktivitasok; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Felhasznalo_aktivitasok" (aktivitas_id, felhasznalo_id, tudasanyag_id, aktivitas_tipus, aktivitas_ido, reszletek) FROM stdin;
1	1	1	["view"]	2024-11-12 17:30:54.826138	Első megtekintés
\.


--
-- TOC entry 4879 (class 0 OID 16558)
-- Dependencies: 217
-- Data for Name: Felhasznalok; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Felhasznalok" (user_id, felhasznalonev, email, password_hash, role) FROM stdin;
1	admin_user	admin@example.com	hashed_password	[\\"admin\\"]
\.


--
-- TOC entry 4884 (class 0 OID 16594)
-- Dependencies: 222
-- Data for Name: Jogosultsagok; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Jogosultsagok" (jogosultsag_id, tudasanyag_id, szerepkor) FROM stdin;
\.


--
-- TOC entry 4881 (class 0 OID 16572)
-- Dependencies: 219
-- Data for Name: Kategoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Kategoria" (kategoria_id, nev, leiras) FROM stdin;
1	Tudásmegosztás	Információk és tudás megosztása szervezeten belül.
\.


--
-- TOC entry 4885 (class 0 OID 16601)
-- Dependencies: 223
-- Data for Name: Tudasanyag_Cimke; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tudasanyag_Cimke" (tudasanyag_id, cimke_id) FROM stdin;
1	1
\.


--
-- TOC entry 4880 (class 0 OID 16565)
-- Dependencies: 218
-- Data for Name: Tudasanyagok; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tudasanyagok" (tudasanyag_id, cim, tartalom, letrehozva, modositva, kategoria_id, letrehozva_altala) FROM stdin;
1	Első tudásanyag	Ez egy példa tudásanyag tartalma.	2024-11-12 17:30:54.826138	2024-11-12 17:30:54.826138	1	1
\.


--
-- TOC entry 4725 (class 2606 OID 16583)
-- Name: Cimkek Cimkek_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cimkek"
    ADD CONSTRAINT "Cimkek_pkey" PRIMARY KEY (cimke_id);


--
-- TOC entry 4727 (class 2606 OID 16593)
-- Name: Felhasznalo_aktivitasok Felhasznalo_aktivitasok_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Felhasznalo_aktivitasok"
    ADD CONSTRAINT "Felhasznalo_aktivitasok_pkey" PRIMARY KEY (aktivitas_id);


--
-- TOC entry 4729 (class 2606 OID 16600)
-- Name: Jogosultsagok Jogosultsagok_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Jogosultsagok"
    ADD CONSTRAINT "Jogosultsagok_pkey" PRIMARY KEY (jogosultsag_id);


--
-- TOC entry 4723 (class 2606 OID 16578)
-- Name: Kategoria Kategoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Kategoria"
    ADD CONSTRAINT "Kategoria_pkey" PRIMARY KEY (kategoria_id);


--
-- TOC entry 4721 (class 2606 OID 16571)
-- Name: Tudasanyagok tudas_anyagok_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tudasanyagok"
    ADD CONSTRAINT tudas_anyagok_pkey PRIMARY KEY (tudasanyag_id);


--
-- TOC entry 4719 (class 2606 OID 16562)
-- Name: Felhasznalok users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Felhasznalok"
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4732 (class 2606 OID 16625)
-- Name: Tudasanyag_Cimke fk_cimke_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tudasanyag_Cimke"
    ADD CONSTRAINT fk_cimke_id FOREIGN KEY (cimke_id) REFERENCES public."Cimkek"(cimke_id);


--
-- TOC entry 4730 (class 2606 OID 16615)
-- Name: Tudasanyagok fk_kategoria; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tudasanyagok"
    ADD CONSTRAINT fk_kategoria FOREIGN KEY (kategoria_id) REFERENCES public."Kategoria"(kategoria_id);


--
-- TOC entry 4731 (class 2606 OID 16610)
-- Name: Tudasanyagok fk_letrehozva_altala; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tudasanyagok"
    ADD CONSTRAINT fk_letrehozva_altala FOREIGN KEY (letrehozva_altala) REFERENCES public."Felhasznalok"(user_id);


--
-- TOC entry 4733 (class 2606 OID 16620)
-- Name: Tudasanyag_Cimke fk_tudasanyag_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tudasanyag_Cimke"
    ADD CONSTRAINT fk_tudasanyag_id FOREIGN KEY (tudasanyag_id) REFERENCES public."Tudasanyagok"(tudasanyag_id);


-- Completed on 2024-11-12 17:34:24

--
-- PostgreSQL database dump complete
--

