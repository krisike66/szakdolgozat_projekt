PGDMP  &                
    |            db_tudasbazis    17.0    17.0 !               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    16557    db_tudasbazis    DATABASE     �   CREATE DATABASE db_tudasbazis WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Hungarian_Hungary.1250';
    DROP DATABASE db_tudasbazis;
                     postgres    false            �            1259    16579    Cimkek    TABLE     _   CREATE TABLE public."Cimkek" (
    cimke_id integer NOT NULL,
    nev character varying(50)
);
    DROP TABLE public."Cimkek";
       public         heap r       postgres    false            �            1259    16587    Felhasznalo_aktivitasok    TABLE     �   CREATE TABLE public."Felhasznalo_aktivitasok" (
    aktivitas_id integer NOT NULL,
    felhasznalo_id integer,
    tudasanyag_id integer,
    aktivitas_tipus json[],
    aktivitas_ido timestamp without time zone,
    reszletek text
);
 -   DROP TABLE public."Felhasznalo_aktivitasok";
       public         heap r       postgres    false            �            1259    16558    Felhasznalok    TABLE     �   CREATE TABLE public."Felhasznalok" (
    user_id integer NOT NULL,
    felhasznalonev character varying(100),
    email character varying(255),
    password_hash character varying(255),
    role json[]
);
 "   DROP TABLE public."Felhasznalok";
       public         heap r       postgres    false                       0    0    COLUMN "Felhasznalok".user_id    COMMENT     W   COMMENT ON COLUMN public."Felhasznalok".user_id IS 'Egyedi felhasználó azonosító';
          public               postgres    false    217                       0    0 $   COLUMN "Felhasznalok".felhasznalonev    COMMENT     O   COMMENT ON COLUMN public."Felhasznalok".felhasznalonev IS 'felhasználónév';
          public               postgres    false    217                       0    0    COLUMN "Felhasznalok".email    COMMENT     J   COMMENT ON COLUMN public."Felhasznalok".email IS 'felhasználó emailje';
          public               postgres    false    217                       0    0 #   COLUMN "Felhasznalok".password_hash    COMMENT     Q   COMMENT ON COLUMN public."Felhasznalok".password_hash IS 'titkosított jelszó';
          public               postgres    false    217                        0    0    COLUMN "Felhasznalok".role    COMMENT     G   COMMENT ON COLUMN public."Felhasznalok".role IS 'jogosultsági szint';
          public               postgres    false    217            �            1259    16594    Jogosultsagok    TABLE     ~   CREATE TABLE public."Jogosultsagok" (
    jogosultsag_id integer NOT NULL,
    tudasanyag_id integer,
    szerepkor json[]
);
 #   DROP TABLE public."Jogosultsagok";
       public         heap r       postgres    false            �            1259    16572 	   Kategoria    TABLE     x   CREATE TABLE public."Kategoria" (
    kategoria_id integer NOT NULL,
    nev character varying(100),
    leiras text
);
    DROP TABLE public."Kategoria";
       public         heap r       postgres    false            �            1259    16601    Tudasanyag_Cimke    TABLE     \   CREATE TABLE public."Tudasanyag_Cimke" (
    tudasanyag_id integer,
    cimke_id integer
);
 &   DROP TABLE public."Tudasanyag_Cimke";
       public         heap r       postgres    false            �            1259    16565    Tudasanyagok    TABLE       CREATE TABLE public."Tudasanyagok" (
    tudasanyag_id integer NOT NULL,
    cim character varying(255),
    tartalom text,
    letrehozva timestamp without time zone,
    modositva timestamp without time zone,
    kategoria_id integer,
    letrehozva_altala integer
);
 "   DROP TABLE public."Tudasanyagok";
       public         heap r       postgres    false                      0    16579    Cimkek 
   TABLE DATA           1   COPY public."Cimkek" (cimke_id, nev) FROM stdin;
    public               postgres    false    220   �&                 0    16587    Felhasznalo_aktivitasok 
   TABLE DATA           �   COPY public."Felhasznalo_aktivitasok" (aktivitas_id, felhasznalo_id, tudasanyag_id, aktivitas_tipus, aktivitas_ido, reszletek) FROM stdin;
    public               postgres    false    221   �&                 0    16558    Felhasznalok 
   TABLE DATA           ]   COPY public."Felhasznalok" (user_id, felhasznalonev, email, password_hash, role) FROM stdin;
    public               postgres    false    217   �&                 0    16594    Jogosultsagok 
   TABLE DATA           S   COPY public."Jogosultsagok" (jogosultsag_id, tudasanyag_id, szerepkor) FROM stdin;
    public               postgres    false    222   '                 0    16572 	   Kategoria 
   TABLE DATA           @   COPY public."Kategoria" (kategoria_id, nev, leiras) FROM stdin;
    public               postgres    false    219   /'                 0    16601    Tudasanyag_Cimke 
   TABLE DATA           E   COPY public."Tudasanyag_Cimke" (tudasanyag_id, cimke_id) FROM stdin;
    public               postgres    false    223   L'                 0    16565    Tudasanyagok 
   TABLE DATA           ~   COPY public."Tudasanyagok" (tudasanyag_id, cim, tartalom, letrehozva, modositva, kategoria_id, letrehozva_altala) FROM stdin;
    public               postgres    false    218   i'       u           2606    16583    Cimkek Cimkek_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Cimkek"
    ADD CONSTRAINT "Cimkek_pkey" PRIMARY KEY (cimke_id);
 @   ALTER TABLE ONLY public."Cimkek" DROP CONSTRAINT "Cimkek_pkey";
       public                 postgres    false    220            w           2606    16593 4   Felhasznalo_aktivitasok Felhasznalo_aktivitasok_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Felhasznalo_aktivitasok"
    ADD CONSTRAINT "Felhasznalo_aktivitasok_pkey" PRIMARY KEY (aktivitas_id);
 b   ALTER TABLE ONLY public."Felhasznalo_aktivitasok" DROP CONSTRAINT "Felhasznalo_aktivitasok_pkey";
       public                 postgres    false    221            y           2606    16600     Jogosultsagok Jogosultsagok_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."Jogosultsagok"
    ADD CONSTRAINT "Jogosultsagok_pkey" PRIMARY KEY (jogosultsag_id);
 N   ALTER TABLE ONLY public."Jogosultsagok" DROP CONSTRAINT "Jogosultsagok_pkey";
       public                 postgres    false    222            s           2606    16578    Kategoria Kategoria_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."Kategoria"
    ADD CONSTRAINT "Kategoria_pkey" PRIMARY KEY (kategoria_id);
 F   ALTER TABLE ONLY public."Kategoria" DROP CONSTRAINT "Kategoria_pkey";
       public                 postgres    false    219            q           2606    16571    Tudasanyagok tudas_anyagok_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."Tudasanyagok"
    ADD CONSTRAINT tudas_anyagok_pkey PRIMARY KEY (tudasanyag_id);
 K   ALTER TABLE ONLY public."Tudasanyagok" DROP CONSTRAINT tudas_anyagok_pkey;
       public                 postgres    false    218            o           2606    16562    Felhasznalok users_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Felhasznalok"
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 C   ALTER TABLE ONLY public."Felhasznalok" DROP CONSTRAINT users_pkey;
       public                 postgres    false    217            |           2606    16625    Tudasanyag_Cimke fk_cimke_id    FK CONSTRAINT     �   ALTER TABLE ONLY public."Tudasanyag_Cimke"
    ADD CONSTRAINT fk_cimke_id FOREIGN KEY (cimke_id) REFERENCES public."Cimkek"(cimke_id) NOT VALID;
 H   ALTER TABLE ONLY public."Tudasanyag_Cimke" DROP CONSTRAINT fk_cimke_id;
       public               postgres    false    220    223    4725            z           2606    16615    Tudasanyagok fk_kategoria    FK CONSTRAINT     �   ALTER TABLE ONLY public."Tudasanyagok"
    ADD CONSTRAINT fk_kategoria FOREIGN KEY (kategoria_id) REFERENCES public."Kategoria"(kategoria_id) NOT VALID;
 E   ALTER TABLE ONLY public."Tudasanyagok" DROP CONSTRAINT fk_kategoria;
       public               postgres    false    218    4723    219            {           2606    16610 !   Tudasanyagok fk_letrehozva_altala    FK CONSTRAINT     �   ALTER TABLE ONLY public."Tudasanyagok"
    ADD CONSTRAINT fk_letrehozva_altala FOREIGN KEY (letrehozva_altala) REFERENCES public."Felhasznalok"(user_id) NOT VALID;
 M   ALTER TABLE ONLY public."Tudasanyagok" DROP CONSTRAINT fk_letrehozva_altala;
       public               postgres    false    217    218    4719            }           2606    16620 !   Tudasanyag_Cimke fk_tudasanyag_id    FK CONSTRAINT     �   ALTER TABLE ONLY public."Tudasanyag_Cimke"
    ADD CONSTRAINT fk_tudasanyag_id FOREIGN KEY (tudasanyag_id) REFERENCES public."Tudasanyagok"(tudasanyag_id) NOT VALID;
 M   ALTER TABLE ONLY public."Tudasanyag_Cimke" DROP CONSTRAINT fk_tudasanyag_id;
       public               postgres    false    223    4721    218                  x������ � �            x������ � �            x������ � �            x������ � �            x������ � �            x������ � �            x������ � �     