--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

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
-- Name: cimkek; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.cimkek (
    cimke_id integer NOT NULL,
    nev character varying(255) NOT NULL,
    kategoria_id integer
);


ALTER TABLE public.cimkek OWNER TO admin;

--
-- Name: cimkek_cimke_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.cimkek_cimke_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cimkek_cimke_id_seq OWNER TO admin;

--
-- Name: cimkek_cimke_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.cimkek_cimke_id_seq OWNED BY public.cimkek.cimke_id;


--
-- Name: ertekeles; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.ertekeles (
    ertekeles_id integer NOT NULL,
    ertekeles integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    tudasanyag_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.ertekeles OWNER TO admin;

--
-- Name: ertekeles_ertekeles_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.ertekeles_ertekeles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ertekeles_ertekeles_id_seq OWNER TO admin;

--
-- Name: ertekeles_ertekeles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.ertekeles_ertekeles_id_seq OWNED BY public.ertekeles.ertekeles_id;


--
-- Name: ertesitesek; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.ertesitesek (
    id integer NOT NULL,
    user_id integer NOT NULL,
    tipus character varying(255) NOT NULL,
    uzenet text NOT NULL,
    olvasott boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.ertesitesek OWNER TO admin;

--
-- Name: ertesitesek_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.ertesitesek_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ertesitesek_id_seq OWNER TO admin;

--
-- Name: ertesitesek_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.ertesitesek_id_seq OWNED BY public.ertesitesek.id;


--
-- Name: felhasznalok; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.felhasznalok (
    user_id integer NOT NULL,
    felhasznalonev character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'user'::character varying
);


ALTER TABLE public.felhasznalok OWNER TO postgres;

--
-- Name: COLUMN felhasznalok.user_id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.felhasznalok.user_id IS 'Egyedi felhasználó azonosító';


--
-- Name: COLUMN felhasznalok.felhasznalonev; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.felhasznalok.felhasznalonev IS 'felhasználónév';


--
-- Name: COLUMN felhasznalok.email; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.felhasznalok.email IS 'felhasználó emailje';


--
-- Name: COLUMN felhasznalok.password_hash; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.felhasznalok.password_hash IS 'titkosított jelszó';


--
-- Name: COLUMN felhasznalok.role; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.felhasznalok.role IS 'jogosultsági szint';


--
-- Name: felhasznalok_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.felhasznalok ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.felhasznalok_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: kategoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kategoria (
    kategoria_id integer NOT NULL,
    nev character varying(255) NOT NULL,
    leiras text
);


ALTER TABLE public.kategoria OWNER TO postgres;

--
-- Name: komments; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.komments (
    komment_id integer NOT NULL,
    szoveg text NOT NULL,
    letrehozva timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    tudasanyag_id integer,
    user_id integer
);


ALTER TABLE public.komments OWNER TO admin;

--
-- Name: komments_komment_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.komments_komment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.komments_komment_id_seq OWNER TO admin;

--
-- Name: komments_komment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.komments_komment_id_seq OWNED BY public.komments.komment_id;


--
-- Name: logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.logs (
    id integer NOT NULL,
    user_id integer NOT NULL,
    action text NOT NULL,
    "timestamp" timestamp with time zone
);


ALTER TABLE public.logs OWNER TO postgres;

--
-- Name: logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.logs_id_seq OWNER TO postgres;

--
-- Name: logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.logs_id_seq OWNED BY public.logs.id;


--
-- Name: tudasanyag_cimke; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.tudasanyag_cimke (
    tudasanyag_id integer NOT NULL,
    cimke_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.tudasanyag_cimke OWNER TO admin;

--
-- Name: tudasanyag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tudasanyag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tudasanyag_id_seq OWNER TO postgres;

--
-- Name: tudasanyagok; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tudasanyagok (
    tudasanyag_id integer DEFAULT nextval('public.tudasanyag_id_seq'::regclass) NOT NULL,
    cim character varying(255) NOT NULL,
    tartalom text NOT NULL,
    letrehozva timestamp with time zone NOT NULL,
    modositva timestamp with time zone NOT NULL,
    kategoria_id integer NOT NULL,
    letrehozva_altala integer,
    modositva_altala integer,
    audit_approved boolean DEFAULT false,
    approved_by integer,
    file character varying(255)
);


ALTER TABLE public.tudasanyagok OWNER TO postgres;

--
-- Name: cimkek cimke_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cimkek ALTER COLUMN cimke_id SET DEFAULT nextval('public.cimkek_cimke_id_seq'::regclass);


--
-- Name: ertekeles ertekeles_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ertekeles ALTER COLUMN ertekeles_id SET DEFAULT nextval('public.ertekeles_ertekeles_id_seq'::regclass);


--
-- Name: ertesitesek id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ertesitesek ALTER COLUMN id SET DEFAULT nextval('public.ertesitesek_id_seq'::regclass);


--
-- Name: komments komment_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.komments ALTER COLUMN komment_id SET DEFAULT nextval('public.komments_komment_id_seq'::regclass);


--
-- Name: logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logs ALTER COLUMN id SET DEFAULT nextval('public.logs_id_seq'::regclass);


--
-- Name: kategoria Kategoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kategoria
    ADD CONSTRAINT "Kategoria_pkey" PRIMARY KEY (kategoria_id);


--
-- Name: cimkek cimkek_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cimkek
    ADD CONSTRAINT cimkek_pkey PRIMARY KEY (cimke_id);


--
-- Name: ertekeles ertekeles_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ertekeles
    ADD CONSTRAINT ertekeles_pkey PRIMARY KEY (ertekeles_id);


--
-- Name: ertesitesek ertesitesek_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ertesitesek
    ADD CONSTRAINT ertesitesek_pkey PRIMARY KEY (id);





ALTER TABLE ONLY public.felhasznalok
    ADD CONSTRAINT felhasznalok_email_key UNIQUE (email);

ALTER TABLE ONLY public.felhasznalok
    ADD CONSTRAINT felhasznalok_felhasznalonev_key UNIQUE (felhasznalonev);


--
-- Name: komments komments_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.komments
    ADD CONSTRAINT komments_pkey PRIMARY KEY (komment_id);


--
-- Name: logs logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_pkey PRIMARY KEY (id);


--
-- Name: tudasanyagok tudas_anyagok_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tudasanyagok
    ADD CONSTRAINT tudas_anyagok_pkey PRIMARY KEY (tudasanyag_id);


--
-- Name: tudasanyag_cimke tudasanyag_cimke_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tudasanyag_cimke
    ADD CONSTRAINT tudasanyag_cimke_pkey PRIMARY KEY (tudasanyag_id, cimke_id);


--
-- Name: felhasznalok users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.felhasznalok
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: ertekeles_user_id_tudasanyag_id; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX ertekeles_user_id_tudasanyag_id ON public.ertekeles USING btree (user_id, tudasanyag_id);


--
-- Name: cimkek cimkek_kategoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cimkek
    ADD CONSTRAINT cimkek_kategoria_id_fkey FOREIGN KEY (kategoria_id) REFERENCES public.kategoria(kategoria_id);


--
-- Name: ertekeles ertekeles_tudasanyag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ertekeles
    ADD CONSTRAINT ertekeles_tudasanyag_id_fkey FOREIGN KEY (tudasanyag_id) REFERENCES public.tudasanyagok(tudasanyag_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ertekeles ertekeles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ertekeles
    ADD CONSTRAINT ertekeles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.felhasznalok(user_id) ON UPDATE CASCADE;


--
-- Name: ertesitesek ertesitesek_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ertesitesek
    ADD CONSTRAINT ertesitesek_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.felhasznalok(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: komments komments_tudasanyag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.komments
    ADD CONSTRAINT komments_tudasanyag_id_fkey FOREIGN KEY (tudasanyag_id) REFERENCES public.tudasanyagok(tudasanyag_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: komments komments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.komments
    ADD CONSTRAINT komments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.felhasznalok(user_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: logs logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.felhasznalok(user_id) ON UPDATE CASCADE;


--
-- Name: tudasanyag_cimke tudasanyag_cimke_cimke_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tudasanyag_cimke
    ADD CONSTRAINT tudasanyag_cimke_cimke_id_fkey FOREIGN KEY (cimke_id) REFERENCES public.cimkek(cimke_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tudasanyag_cimke tudasanyag_cimke_tudasanyag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tudasanyag_cimke
    ADD CONSTRAINT tudasanyag_cimke_tudasanyag_id_fkey FOREIGN KEY (tudasanyag_id) REFERENCES public.tudasanyagok(tudasanyag_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tudasanyagok tudasanyagok_kategoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tudasanyagok
    ADD CONSTRAINT tudasanyagok_kategoria_id_fkey FOREIGN KEY (kategoria_id) REFERENCES public.kategoria(kategoria_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tudasanyagok tudasanyagok_letrehozva_altala_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tudasanyagok
    ADD CONSTRAINT tudasanyagok_letrehozva_altala_fkey FOREIGN KEY (letrehozva_altala) REFERENCES public.felhasznalok(user_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: tudasanyagok tudasanyagok_modositva_altala_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tudasanyagok
    ADD CONSTRAINT tudasanyagok_modositva_altala_fkey FOREIGN KEY (modositva_altala) REFERENCES public.felhasznalok(user_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

