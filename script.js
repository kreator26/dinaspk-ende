// ============================================================
// SISTEM INFORMASI SEKOLAH - KABUPATEN ENDE
// File: script.js (Versi Multi-Page: login.html + dashboard.html)
// ============================================================

// ============ DATA SEKOLAH ============
const RAW_DATA = `KB ARARA	70027792	KB	Ende
KB Arrahman Watubara	70005156	KB	Wewaria
KB FAJAR PAGI	70014378	KB	Kota Baru
KB KELIWUMBU	70011247	KB	Maurole
KB MARLOM	70006252	KB	Kelimutu
KB MATABALE	70002784	KB	Ende Tengah
KB MENTARI	70047941	KB	Nangapanda
KB MUTIARA KASIH	70026740	KB	Wewaria
KB NUALISE	69991307	KB	Wolowaru
KB PERTIWI	70026767	KB	Nangapanda
KB PERWIRA	69987093	KB	Ende Utara
KB SANTO HENDRIKUS	70002740	KB	Lepembusu Kelisoke
KB SANTO PHILIPUS	70042684	KB	Kota Baru
KB SINAR EMBUZOZO	70027166	KB	Nangapanda
KB SINAR OTOLEKE	70014379	KB	Lepembusu Kelisoke
KB ST. PIUS	70028687	KB	Lio Timur
KB STA. ELISABETH	70043776	KB	Wewaria
KB TERPADU KASIH BUNDA	70033674	KB	Ende
KB TERPADU RENATA	70025717	KB	Nangapanda
KB TERPADU ST. PAULUS KOTAKADHE	70048520	KB	Maukaro
KB WAKA	70036061	TK	Wewaria
KB Watu Gamba	70007552	TK	Ende
KB WONGA WEA NGGELA	70038565	KB	Wolojita
KB WONGAWUJA	69988337	KB	Ende
KB. AEDERO	69974111	KB	Detukeli
KB. AEMAU NANGARIA	69969048	KB	Maurole
KB. Anggrek	69845132	KB	Ndona
KB. ANUGERAH	69967735	KB	Ende
KB. Ar - Rahman	69845105	KB	Ende Selatan
KB. AREMA	69972512	KB	Pulau Ende
KB. AZZAHRA	69845124	KB	Ende Utara
KB. Bengawan Jaya	69845186	KB	Detusoko
KB. BEWU SEA	69962430	KB	Lepembusu Kelisoke
KB. BHISU KOJA	69984519	KB	Detusoko
KB. BINA KASIH TURUNALU	69979762	KB	Detusoko
KB. Borokanda	69845126	KB	Ende Utara
KB. Bunda Perubahan	69845099	KB	Ende Selatan
KB. CINTA ANAK HOBATUWA	69979544	KB	Lio Timur
KB. CINTA ANAK NUABOSI	69845097	KB	Ende
KB. DAI MAU ENGA NANGA	69969715	KB	Maurole
KB. DETUNGGALI  LEWUMBANGGA	69967737	KB	Wewaria
KB. DEWI LESTARI	69845101	KB	Ende Selatan
KB. DHOA ANA	69981583	KB	Nangapanda
KB. EMBURIA	69965363	KB	Ende
KB. GADO RUA	69969716	KB	Maurole
KB. Harapan Bangsa	69845098	KB	Ende
KB. HARAPAN BUNDA	69845108	KB	Ende Selatan
KB. KALEMBALE	69963671	KB	Lio Timur
KB. Kasih Ibu Mundinggasa	69845089	KB	Maukaro
KB. Kasih Ibu Wolomuku	69845174	KB	Detukeli
KB. Marilonga	69845180	KB	Detukeli
KB. MODA BENGE	69969729	KB	Maurole
KB. Nanganesa	69845129	KB	Ndona
KB. NASARET BENGGE	69970474	KB	Maukaro
KB. Ndoki Pati	69845179	KB	Detukeli
KB. PANTURA AEWORA	69969714	KB	Maurole
KB. PATAS	69845100	KB	Ende Selatan
KB. PEDI PASO	69974822	KB	Detukeli
KB. PERA PAWE	69845130	KB	Ndona
KB. Ratu Pencinta Balita	69845121	KB	Ende Utara
KB. SALIB SUCI NDETUNDOPO	69964154	KB	Maukaro
KB. SANTA AGUSTINA AELOGA	69973379	KB	Wewaria
KB. SANTA SISILIA	69963096	KB	Ende Timur
KB. SEHATI	69845093	KB	Ende
KB. St. ANTONIUS PAUWAWA	69962392	KB	Nangapanda
KB. St. SOFIA EKOLEA	69964153	KB	Wewaria
KB. TOJA MODA	69965985	KB	Lepembusu Kelisoke
KB. TUNAS BANGSA	69966188	KB	Ende Selatan
KB. TUNAS BARU	69970499	KB	Pulau Ende
KB. ULU DALA	69845162	KB	Maurole
KB. WOLO WEA	69845181	KB	Detusoko
KB. WOLOLANU	69970440	KB	Wolowaru
KB. WOLOSOKO	69967475	KB	Wolowaru
KB. WOROPAPA	69966705	KB	Ende
KB.Ana Sare	69845139	KB	Wolowaru
KB.Bintang Timur	69845167	KB	Kota Baru
KB.Bunga Mawar	69845133	KB	Ndona
KB.Cahaya Permata	69845187	KB	Detusoko
KB.Danau Ranoria	69845182	KB	Detusoko
KB.Fajar Timur	69845169	KB	Kota Baru
KB.Ilham	69845087	KB	Maukaro
KB.Ingin Maju	69845082	KB	Nangapanda
KB.Kasih Ibu Mbiru	69845143	KB	Wolojita
KB.Lunggaria	69845156	KB	Ndori
KB.Ndori Sare	69845157	KB	Ndori
KB.NUAGIU	69965986	KB	Detusoko
KB.Nusa Sura	69845083	KB	Pulau Ende
KB.Permata Hati	69845155	KB	Kelimutu
KB.Permata Puutara	69845085	KB	Pulau Ende
KB.Peromboro	69845115	KB	Ende Timur
KB.Sehati Rateroru	69845183	KB	Detusoko
KB.SEKOSODO	69845163	KB	Maurole
KB.Sinar Bahagia	69845084	KB	Pulau Ende
KB.Sinar Harapan Dile	69845184	KB	Detusoko
KB.St. Faustina Anaranda	69845190	KB	Wewaria
KB.St.Antonius	69845189	KB	Wewaria
KB.Tabah	69845110	KB	Ende Timur
KB.Try Warna	69845151	KB	Kelimutu
KB.Tunas Harapan	69845090	KB	Ende
KB.Wolokoli	69845140	KB	Wolowaru
KBA MURI SARE	69992558	KB	Kota Baru
KBA NAZARETH	69996280	KB	Ende Timur
KBA RAJAWALI	69991613	KB	Nangapanda
KOBER AISYIYAH	69946721	KB	Ende Timur
KOBER AMBUGAGA	69959893	KB	Ende Utara
KOBER BINA KASIH DETUNGGALI	69946064	KB	Wewaria
KOBER BOAFEO	69953609	KB	Maukaro
KOBER BOTI FATE	69845173	KB	Kota Baru
KOBER GAMA GENERATION	69946066	KB	Ende Selatan
KOBER HARAPAN	69952674	KB	Pulau Ende
KOBER KASIH BUNDA WIWIPEMO	69946056	KB	Wolojita
KOBER KASIH SAYANG PAUBEWA	69946065	KB	Lepembusu Kelisoke
KOBER LANDO RANGA	69845172	KB	Kota Baru
KOBER MAUMERI PERMAI	69960599	KB	Wewaria
KOBER MEKAR SARI	69952708	KB	Ndona
KOBER MORI MAJA	69946068	KB	Ndona
KOBER NIRAMESI	69845141	KB	Wolowaru
KOBER ODA MBESI	69946244	KB	Nangapanda
KOBER PUU KOJA NDITO	69946027	KB	Detusoko
KOBER RENDO SARE	69952673	KB	Pulau Ende
KOBER SADO GEDU	69946020	KB	Ende
KOBER SEKOPADA	69946063	KB	Wewaria
KOBER SOLIDARITAS BUNDA	69946245	KB	Ende Tengah
KOBER ST. BONEFASIUS MBANI	69960462	KB	Ende
KOBER St. DANIEL	69945437	KB	Wewaria
KOBER St. JOSEF FREINADEMETZ MAUTAPAGA	69946014	KB	Ende Timur
KOBER ST. PETRUS WOLOGERU	69946054	KB	Detusoko
KOBER ST. SIMON PETRUS TIWUSORA	69945986	KB	Lepembusu Kelisoke
KOBER STA. THERESIA	70054903	KB	Nangapanda
KOBER TANI WODA KARYA	69845171	KB	Kota Baru
KOBER TENDA TEBHA	69946052	KB	Maukaro
KOBER UNGGU JAYA	69945989	KB	Detukeli
KOBER WEE LOMBO	69946053	KB	Kelimutu
KOBER WOLOMONI	69946058	KB	Detusoko
PAUD PELITA	69991940	KB	Ende Tengah
PAUD ST. ALEXANDRIA NGGEMO	69990190	KB	Maukaro
PAUD TERPADU POSYANDU MANDIRI BASA PUURERE	69946019	SPS	Nangapanda
PKBM ALOKOJA SIA	P9997487	PKBM	Wewaria
PKBM ANNORA	P9945672	PKBM	Ende Selatan
PKBM BUNGA MAWAR	P9945655	PKBM	Ndona
PKBM KAPO WALO	P9997476	PKBM	Ende Timur
PKBM KEBHI DUA	P9908890	PKBM	Detusoko
PKBM MARILONGA	P2960007	PKBM	Detukeli
PKBM Sandi Kelana Ngalukoja	P9996516	PKBM	Maurole
PKBM SANTA ANGELA ENDE	P2970874	PKBM	Ende Timur
SD GMIT ENDE 4	50305570	SD	Ende Utara
SD INPRES AEDARI	50302735	SD	Detukeli
SD INPRES AEKORA	50302736	SD	Detukeli
SD INPRES AEMAU	50305621	SD	Maurole
SD INPRES AEREA	50302737	SD	Ndori
SD INPRES AETEKE	50302754	SD	Lio Timur
SD INPRES BARAI 1	50305564	SD	Ende Utara
SD INPRES BARAI 2	50302753	SD	Ende Utara
SD INPRES BELANGGO	50305697	SD	Wolowaru
SD INPRES BHOANAWA 1	50305540	SD	Ende Selatan
SD INPRES BHOANAWA 2	50302751	SD	Ende Selatan
SD INPRES DETUBELO	50302750	SD	Lio Timur
SD INPRES DETUENA	50302749	SD	Kelimutu
SD INPRES DETUETE	50305655	SD	Wewaria
SD INPRES DETUSOKO	50302747	SD	Detusoko
SD INPRES DETUWIRA	50305577	SD	Detusoko
SD INPRES EKOLEA	50302746	SD	Wewaria
SD INPRES EKOTARU	50305710	SD	Wewaria
SD INPRES ENDE 10	50305549	SD	Ende Tengah
SD INPRES ENDE 11	50302744	SD	Ende Utara
SD INPRES ENDE 12	50305565	SD	Ende Utara
SD INPRES ENDE 13	50302743	SD	Ende Tengah
SD INPRES ENDE 14	50302742	SD	Ende Timur
SD INPRES ENDE 15	50305566	SD	Ende Utara
SD INPRES ENDE 16	50302741	SD	Ende Timur
SD INPRES ENDE 7	50302740	SD	Ende Timur
SD INPRES ENDE 9	50302739	SD	Ende Utara
SD INPRES FEORIA	50302738	SD	Detukeli
SD INPRES HOBAKUA	50302717	SD	Ndori
SD INPRES ILIWODO 1	50305646	SD	Ndori
SD INPRES ILIWODO 2	50305647	SD	Ndori
SD INPRES JOPU 4	50305680	SD	Wolowaru
SD INPRES JOPU 5	50302716	SD	Wolowaru
SD INPRES KEKAKEU	50302695	SD	Nangapanda
SD INPRES KEKAWII	50305584	SD	Ende
SD INPRES KELITEMBU	50302694	SD	Wewaria
SD INPRES KOAGATA	50302693	SD	Ndona
SD INPRES KOAWENA	50302692	SD	Ende Timur
SD INPRES KOLIKAPA	50302691	SD	Maukaro
SD INPRES KOTABARU	50302690	SD	Kota Baru
SD INPRES KURUMBORO	50302689	SD	Ende Timur
SD INPRES LEWAGARE	50302687	SD	Detukeli
SD INPRES LIANGGERE	50302686	SD	Ende
SD INPRES LIGALEJO	50302685	SD	Kota Baru
SD INPRES LOKOBOKO	50302769	SD	Ndona
SD INPRES LOWOKETO	50305594	SD	Kota Baru
SD INPRES LOWORONGGA	50302684	SD	Ndona
SD INPRES MALAWARU	50305531	SD	Nangapanda
SD INPRES MAUAU	50302683	SD	Pulau Ende
SD INPRES MAUROLE	50302682	SD	Maurole
SD INPRES MAURONGGA	50302681	SD	Nangapanda
SD INPRES MAUTENDA	50302680	SD	Wewaria
SD INPRES MBONGAWANI	50305541	SD	Ende Selatan
SD INPRES MBOTUJITA	50302679	SD	Detusoko
SD INPRES MBUJALOO	50305661	SD	Wolojita
SD INPRES MBULILOO	50302696	SD	Wolowaru
SD INPRES METINUMBA 1	50302697	SD	Pulau Ende
SD INPRES METINUMBA 2	50302698	SD	Pulau Ende
SD INPRES MUNDINGGASA	50302715	SD	Maukaro
SD INPRES NANGANIO	50302714	SD	Maurole
SD INPRES NANGAPANDA 2	50302713	SD	Nangapanda
SD INPRES NANGAPANDA 3	50302712	SD	Nangapanda
SD INPRES NDETUFEO	50302710	SD	Nangapanda
SD INPRES NDETUNDORA 1	50305707	SD	Ende
SD INPRES NDETUNDORA 2	50305585	SD	Ende
SD INPRES NDETUWARU	50302709	SD	Nangapanda
SD INPRES NDITO	50302708	SD	Detusoko
SD INPRES NDONA 3	50305627	SD	Ndona
SD INPRES NDONA 4	50302707	SD	Ndona
SD INPRES NGALUPOLO	50305628	SD	Ndona
SD INPRES NGALUROGA	50305629	SD	Ndona
SD INPRES NGGELA 2	50305662	SD	Wolojita
SD INPRES NGGEMO	50302706	SD	Maurole
SD INPRES NIONIBA	50302705	SD	Maurole
SD INPRES NIOSANGGO	50302704	SD	Wewaria
SD INPRES NIRANUSA	50305622	SD	Maurole
SD INPRES NUAJA	50302703	SD	Ende
SD INPRES NUAMURI 2	50302702	SD	Kelimutu
SD INPRES NUANAGA	50302701	SD	Kota Baru
SD INPRES NUAPU	50305644	SD	Ndona Timur
SD INPRES NUATU	50302699	SD	Wolowaru
SD INPRES NUMBA 1	50302677	SD	Nangapanda
SD INPRES NUMBA 2	50302797	SD	Nangapanda
SD INPRES ONEKORE 3	50302814	SD	Ende Tengah
SD INPRES ONEKORE 4	50305546	SD	Ende Utara
SD INPRES ONEKORE 5	50305547	SD	Ende Tengah
SD INPRES ONEKORE 6	50305548	SD	Ende Tengah
SD INPRES OTOMBAMBA	50302813	SD	Ndona
SD INPRES PANALATO	50305595	SD	Kota Baru
SD INPRES PASADOO	50302812	SD	Detusoko
SD INPRES PAUPANDA 1	50302811	SD	Ende Selatan
SD INPRES PAUPANDA 2	50302810	SD	Ende Selatan
SD INPRES PAUPANDA 3	50302809	SD	Ende Selatan
SD INPRES PUUDHOMBO	50302808	SD	Ende
SD INPRES PUUKUNGU	50302807	SD	Nangapanda
SD INPRES PUUPAU	50302806	SD	Nangapanda
SD INPRES RAAWEKA	50302805	SD	Wewaria
SD INPRES RABURIA	50302804	SD	Ende
SD INPRES RANGGATALO	50305606	SD	Lio Timur
SD INPRES RATESUBA	50302802	SD	Maukaro
SD INPRES REDA	50305586	SD	Ende
SD INPRES RENDOMAUPANDI	50302801	SD	Pulau Ende
SD INPRES ROA	50302800	SD	Detusoko
SD INPRES ROJA 2	50305709	SD	Ende Selatan
SD INPRES ROJABAI	50305596	SD	Kota Baru
SD INPRES ROPA	50302799	SD	Maurole
SD INPRES ROWORENA 2	50302798	SD	Ende Utara
SD INPRES SOKOLOO	50302816	SD	Lepembusu Kelisoke
SD INPRES SOKORIA	50302817	SD	Maurole
SD INPRES TANARHI	50302828	SD	Nangapanda
SD INPRES TETANDARA	50302829	SD	Ende Tengah
SD INPRES TIWEREA	50305532	SD	Nangapanda
SD INPRES WAKA	50302830	SD	Wewaria
SD INPRES WATUBEWA	50302832	SD	Wolowaru
SD INPRES WATUJARA	50302833	SD	Ende Timur
SD INPRES WATUMESI	50302834	SD	Maurole
SD INPRES WATUMOTO	50305663	SD	Wolojita
SD INPRES WELAMOSA	50305656	SD	Wewaria
SD INPRES WEWARIA	50302835	SD	Wewaria
SD INPRES WOLOARA	50302827	SD	Kelimutu
SD INPRES WOLOGAI	50302826	SD	Ende
SD INPRES WOLOJITA	50302818	SD	Wolojita
SD INPRES WOLOKOLI	50302819	SD	Wewaria
SD INPRES WOLOLA	50302820	SD	Lepembusu Kelisoke
SD INPRES WOLOMAGE	50305657	SD	Wewaria
SD INPRES WOLOOJA 1	50305681	SD	Wolowaru
SD INPRES WOLOOJA 3	50302822	SD	Wolowaru
SD INPRES WOLOTOPO	50302823	SD	Ndona
SD INPRES WOLOWARU 4	50302825	SD	Wolowaru
SD INPRES WOLOWARU 5	50302796	SD	Wolowaru
SD INPRES WOLOWONA 1	50302773	SD	Ende Timur
SD INPRES WOLOWONA 2	50302772	SD	Ende Timur
SD INPRES WONDA	50305650	SD	Ndori
SD INPRES WOROJA	50302771	SD	Ende Utara
SD INPRES WOROPAPA	50305587	SD	Ende
SD INPRES WUKARIA	50305658	SD	Wewaria
SD KATOLIK AEBARA	50305648	SD	Ndori
SD KATOLIK AEFEO	50305591	SD	Ende
SD KATOLIK AEISA	50305689	SD	Ende Utara
SD KATOLIK AEKORO	50302545	SD	Ende
SD KATOLIK AEWORA	50302767	SD	Maurole
SD KATOLIK ANARANDA	50305660	SD	Wewaria
SD KATOLIK ASE	50305608	SD	Lio Timur
SD KATOLIK BOAFEO	50302765	SD	Maukaro
SD KATOLIK BUUBEI	50302764	SD	Ende
SD KATOLIK BUUNGENDA	50302718	SD	Detusoko
SD KATOLIK DEDU	50302763	SD	Ndona
SD KATOLIK DETUARA	50305599	SD	Lepembusu Kelisoke
SD KATOLIK DETUBELA 1	50302762	SD	Wewaria
SD KATOLIK DETUDENU	50305601	SD	Lepembusu Kelisoke
SD KATOLIK DETUELU	50305578	SD	Lepembusu Kelisoke
SD KATOLIK DETUKOU	50302761	SD	Kota Baru
SD KATOLIK DETUMBAWA	50302760	SD	Ende Timur
SD KATOLIK DETUMBEWA	50302759	SD	Detukeli
SD KATOLIK DETUPERA	50305609	SD	Lio Timur
SD KATOLIK DETUWULU	50302758	SD	Maurole
SD KATOLIK DILE	50302757	SD	Detusoko
SD KATOLIK EKOAE	50305711	SD	Wewaria
SD KATOLIK EKOLETA	50305698	SD	Detusoko
SD KATOLIK ENDE 8	50302795	SD	Ende Tengah
SD KATOLIK FENDO	50305610	SD	Lio Timur
SD KATOLIK FUNGAPANDA	50302794	SD	Detukeli
SD KATOLIK GANA	50305611	SD	Lio Timur
SD KATOLIK GHAIBHABHA	50305575	SD	Detukeli
SD KATOLIK HANGALANDE	50302793	SD	Kota Baru
SD KATOLIK JOGE	50302792	SD	Maurole
SD KATOLIK JOPU 1	50302791	SD	Wolowaru
SD KATOLIK JOPU 2	50305683	SD	Wolowaru
SD KATOLIK JOPU 3	50305684	SD	Wolowaru
SD KATOLIK KAMUBHEKA	50305618	SD	Maukaro
SD KATOLIK KANGANARA	50302790	SD	Detukeli
SD KATOLIK KEDO	50302788	SD	Lepembusu Kelisoke
SD KATOLIK KEDOGAJA	50302787	SD	Lepembusu Kelisoke
SD KATOLIK KEKADORI	50302786	SD	Nangapanda
SD KATOLIK KEKAJODHO	50302785	SD	Ende
SD KATOLIK KEKANDERE 1	50302784	SD	Nangapanda
SD KATOLIK KEKANDERE 2	50302783	SD	Nangapanda
SD KATOLIK KEKASEWA	50302782	SD	Ndona
SD KATOLIK KEKAWII	50302781	SD	Ende
SD KATOLIK KOANARA	50302780	SD	Kelimutu
SD KATOLIK KOMBANDARU	50302779	SD	Ende
SD KATOLIK KOMBO	50302778	SD	Wewaria
SD KATOLIK KURULIMBU	50305645	SD	Ndona Timur
SD KATOLIK LAINILA	50302756	SD	Ndona
SD KATOLIK LANDOKURA	50305637	SD	Ndona Timur
SD KATOLIK LIAKAMBA	50302676	SD	Wolojita
SD KATOLIK LIKANAKA	50302596	SD	Wolowaru
SD KATOLIK LOBONIKI	50305602	SD	Kota Baru
SD KATOLIK LOKAOJA	50305603	SD	Kota Baru
SD KATOLIK LOKOBOKO	50302575	SD	Ndona
SD KATOLIK MAGEKOBA	50302574	SD	Detukeli
SD KATOLIK MAGENGURA	50302573	SD	Ende
SD KATOLIK MARSUDIRINI	50302572	SD	Detusoko
SD KATOLIK MAUKARO	50305619	SD	Maukaro
SD KATOLIK MBAKAONDO	50302571	SD	Maukaro
SD KATOLIK MBOMBA	50302570	SD	Ende Utara
SD KATOLIK MONDO	50302569	SD	Ndona
SD KATOLIK MUKUSAKI	50302568	SD	Wewaria
SD KATOLIK NABE	50302647	SD	Maukaro
SD KATOLIK NANGAKEO	50302565	SD	Nangapanda
SD KATOLIK NANGAMBOA	50302564	SD	Nangapanda
SD KATOLIK NANGAPANDA 1	50302563	SD	Nangapanda
SD KATOLIK NAZARETH ENDE	70005989	SD	Ende Timur
SD KATOLIK NDETUKUNE	50302562	SD	Nangapanda
SD KATOLIK NDONA 1	50302561	SD	Ndona
SD KATOLIK NDONA 2	50302540	SD	Ndona
SD KATOLIK NDUARIA	50302560	SD	Kelimutu
SD KATOLIK NGALUPOLO	50305631	SD	Ndona
SD KATOLIK NGEBONDANA	50305612	SD	Lio Timur
SD KATOLIK NGGELA 1	50302559	SD	Wolojita
SD KATOLIK NGGESADETU	50302558	SD	Detukeli
SD KATOLIK NIDA	50302576	SD	Detukeli
SD KATOLIK NIOPANDA	50305604	SD	Kota Baru
SD KATOLIK NIRANANGA	50302577	SD	Nangapanda
SD KATOLIK NUABOSI	50302578	SD	Ende
SD KATOLIK NUAMULU	50305665	SD	Wolojita
SD KATOLIK NUAMURI 1	50302595	SD	Kelimutu
SD KATOLIK NUAULU	50302594	SD	Wolowaru
SD KATOLIK NUAWIKA	50305605	SD	Lepembusu Kelisoke
SD KATOLIK NUMBA	50305579	SD	Wewaria
SD KATOLIK OKA	50302593	SD	Wolowaru
SD KATOLIK ONEKORE 1	50305560	SD	Ende Tengah
SD KATOLIK ONEKORE 2	50305561	SD	Ende Tengah
SD KATOLIK PAAPINGGA	50305638	SD	Ndona Timur
SD KATOLIK PANAMATA	50305593	SD	Ende
SD KATOLIK PAUMERE	50305536	SD	Nangapanda
SD KATOLIK PAUPIRE	50302592	SD	Ende Tengah
SD KATOLIK PEIBENGA	50302591	SD	Lepembusu Kelisoke
SD KATOLIK PEMO 1	50302590	SD	Kelimutu
SD KATOLIK PEMO 2	50302589	SD	Wolowaru
SD KATOLIK PISA TANAAU	50305576	SD	Lepembusu Kelisoke
SD KATOLIK PISE	50302588	SD	Kota Baru
SD KATOLIK PISOMBOPO	50302587	SD	Nangapanda
SD KATOLIK PORA	50305667	SD	Wolojita
SD KATOLIK PUUBHETO	50302586	SD	Ende
SD KATOLIK PUUFEO	50305571	SD	Ende Utara
SD KATOLIK PUUKOU	50302585	SD	Nangapanda
SD KATOLIK PUUTUGA	50305632	SD	Ndona
SD KATOLIK RANGA	50305580	SD	Detusoko
SD KATOLIK RANOKOLO	50305623	SD	Maurole
SD KATOLIK RATEMBUE	50302581	SD	Wolowaru
SD KATOLIK RATERORU	50302580	SD	Detusoko
SD KATOLIK REKA	50305633	SD	Ndona
SD KATOLIK ROGA	50305639	SD	Ndona Timur
SD KATOLIK ROWOREKE 1	50302579	SD	Ende Timur
SD KATOLIK ROWOREKE 2	50302557	SD	Ende Timur
SD KATOLIK SAGA	50305581	SD	Detusoko
SD KATOLIK SEULAKO	50302675	SD	Ndona Timur
SD KATOLIK SOKORIA 1	50305641	SD	Ndona Timur
SD KATOLIK SOKORIA 2	50305642	SD	Ndona Timur
SD KATOLIK ST AMBROSIUS ENDE 6	50305573	SD	Ende Utara
SD KATOLIK ST ANTONIUS ENDE 2	50302775	SD	Ende Utara
SD KATOLIK ST THERESIA ENDE 3	50302776	SD	Ende Tengah
SD KATOLIK TANAJEA	50302528	SD	Nangapanda
SD KATOLIK TENDA	50302529	SD	Wolojita
SD KATOLIK TOBA	50305721	SD	Ndona Timur
SD KATOLIK WAGA	50305668	SD	Wolojita
SD KATOLIK WAKA	50302530	SD	Wewaria
SD KATOLIK WATUKAMBA	50302531	SD	Maurole
SD KATOLIK WATUMITE	50302532	SD	Nangapanda
SD KATOLIK WATUNESO	50305613	SD	Lio Timur
SD KATOLIK WATUNGGERE	50302534	SD	Detukeli
SD KATOLIK WATURAKA	50302526	SD	Kelimutu
SD KATOLIK WATUSIPI	50302525	SD	Ende Utara
SD KATOLIK WELAMOSA	50302517	SD	Wewaria
SD KATOLIK WOLOBHETO	50305614	SD	Lio Timur
SD KATOLIK WOLOFEO	50302519	SD	Detusoko
SD KATOLIK WOLOGAI DETUSOKO	50305716	SD	Detusoko
SD KATOLIK WOLOGAI ENDE	50305589	SD	Ende
SD KATOLIK WOLOGERU	50302523	SD	Detusoko
SD KATOLIK WOLOJITA	50302524	SD	Wolojita
SD KATOLIK WOLOKOTA	50305634	SD	Ndona
SD KATOLIK WOLOLANU	50305669	SD	Wolojita
SD KATOLIK WOLOLELE A	50305615	SD	Lio Timur
SD KATOLIK WOLOLELE B	50302535	SD	Wolowaru
SD KATOLIK WOLOMAGE	50302536	SD	Detusoko
SD Katolik Wolomota	50305616	SD	Lio Timur
SD KATOLIK WOLOMUKU	50302554	SD	Detukeli
SD KATOLIK WOLONDOPO 1	50302552	SD	Wolowaru
SD KATOLIK WOLONDOPO 2	50302551	SD	Detusoko
SD KATOLIK WOLOORA	50305592	SD	Ende
SD KATOLIK WOLOSAMBI	50305617	SD	Lio Timur
SD KATOLIK WOLOSOKO	50302550	SD	Wolowaru
SD KATOLIK WOLOTOLO	50305582	SD	Detusoko
SD KATOLIK WOLOTOPO 1	50302549	SD	Ndona
SD KATOLIK WOLOTOPO 2	50302648	SD	Ndona
SD KATOLIK WOLOWARU 1	50302548	SD	Wolowaru
SD KATOLIK WOLOWARU 2	50302547	SD	Wolowaru
SD KATOLIK WOLOWUSU	50305635	SD	Ndona
SD KATOLIK WONDA	50302546	SD	Ndori
SD KATOLIK WOROMBERA	50305590	SD	Ende
SD NEGERI ANAREWA	50302646	SD	Pulau Ende
SD NEGERI DETUBELA 2	50305597	SD	Lepembusu Kelisoke
SD NEGERI EKOREKO	50302645	SD	Pulau Ende
SD NEGERI ENDE 1	50305568	SD	Ende Utara
SD NEGERI ENDE 5	50302644	SD	Ende Tengah
SD NEGERI IPI	50305543	SD	Ende Selatan
SD NEGERI KEDEBODU	69734390	SD	Ende Timur
SD NEGERI KEDOBORO	50302643	SD	Maurole
SD NEGERI KOBALEBA	50305620	SD	Maukaro
SD NEGERI KURUPOKE	50305574	SD	Detukeli
SD NEGERI LELU	50302641	SD	Lio Timur
SD NEGERI MALAARA	50305533	SD	Nangapanda
SD NEGERI MARANUA	50305588	SD	Ende
SD NEGERI MAUNGGORA	50305722	SD	Nangapanda
SD NEGERI MOKEASA	50302640	SD	Ende
SD NEGERI MOLEKELISAMBA	50305651	SD	Ndori
SD NEGERI MOLETEBOSAMA	50302639	SD	Wolowaru
SD NEGERI MOLUTANGGA	50308517	SD	Wewaria
SD NEGERI NUSANGGALA	50302638	SD	Kota Baru
SD NEGERI OJA	50305534	SD	Nangapanda
SD NEGERI PUUTARA	50305653	SD	Pulau Ende
SD NEGERI RATENGGOJI	50305598	SD	Lepembusu Kelisoke
SD NEGERI ROJA 1	50302637	SD	Ende Selatan
SD NEGERI ROJA 3	50305544	SD	Ende Selatan
SD NEGERI ROJA 6	50302654	SD	Ende Selatan
SD NEGERI RUTU JEJA	69965710	SD	Lepembusu Kelisoke
SD NEGERI SARELAKA	50308518	SD	Lepembusu Kelisoke
SD NEGERI SOGOROGA	50308519	SD	Ende
SD NEGERI TURUNALU	50305583	SD	Detusoko
SD NEGERI UMANUBA	50305535	SD	Nangapanda
SD NEGERI WATUBARA	50302831	SD	Wewaria
SD NEGERI WIWIPEMO	50305664	SD	Wolojita
SD NEGERI WOIMITE	50302655	SD	Wewaria
SD NEGERI WOLOARA	50306096	SD	Kelimutu
SD NEGERI WOLOGAWI	50302656	SD	Wolojita
SD NEGERI WOLOHEPO	50305682	SD	Wolowaru
SD NEGERI WOLOMONI	50302674	SD	Detusoko
SD NEGERI WOLONIO	50305607	SD	Lio Timur
SD NEGERI WOLOOJA 2	50305659	SD	Wewaria
SD NEGERI WOLOWARU 3	50302673	SD	Wolowaru
SD SWASTA MUHAMMADYAH ENDE	50302544	SD	Ende Utara
SDN NAKAWARA	69768280	SD	Ende
SDN ULU DALA	70045708	SD	Maurole
SKB KABUPATEN ENDE	P9970219	SKB	Ende Tengah
SMP KATOLIK FRATERAN NDAO ENDE	50302664	SMP	Ende Utara
SMP KATOLIK MARIA GORETI ENDE	50302665	SMP	Ende Tengah
SMP KATOLIK NAZARETH ENDE	70062969	SMP	Ende Timur
SMP KATOLIK ST. GABRIEL NDONA	50302609	SMP	Ndona
SMP KATOLIK ST. THERESIA NGGELA	50305427	SMP	Wolojita
SMP KATOLIK SWADAYA MAUKARO	50302608	SMP	Maukaro
SMP KATOLIK WAWONATO	50302662	SMP	Ende
SMP KRISTEN ENDE	50302658	SMP	Ende Tengah
SMP MUHAMMADIYAH ENDE	50302635	SMP	Ende Utara
SMP NEGERI 1 DETUSOKO	50302604	SMP	Wewaria
SMP NEGERI 1 ENDE	50305410	SMP	Ende Tengah
SMP NEGERI 1 ENDE SELATAN	50302603	SMP	Ende Selatan
SMP NEGERI 1 MAUROLE	50302602	SMP	Maurole
SMP NEGERI 1 NANGAPANDA	50302601	SMP	Nangapanda
SMP NEGERI 1 NDONA	50302600	SMP	Ndona
SMP NEGERI 1 WOLOWARU	50302599	SMP	Wolowaru
SMP NEGERI 2 DETUSOKO	50302598	SMP	Lepembusu Kelisoke
SMP NEGERI 2 ENDE	50305409	SMP	Ende Tengah
SMP NEGERI 2 ENDE SELATAN	50302615	SMP	Ende Utara
SMP NEGERI 2 MAUROLE	50302616	SMP	Kota Baru
SMP NEGERI 2 NANGAPANDA	50302617	SMP	Pulau Ende
SMP NEGERI 2 NDONA	50305419	SMP	Ndona
SMP NEGERI 2 WOLOWARU	50302634	SMP	Wolowaru
SMP NEGERI 3 ENDE	50305408	SMP	Ende
SMP NEGERI 3 NANGAPANDA	50302633	SMP	Nangapanda
SMP NEGERI 3 NDONA	50305420	SMP	Ndona
SMP NEGERI 3 WOLOWARU	50302632	SMP	Lio Timur
SMP NEGERI 4 NANGAPANDA	50305418	SMP	Nangapanda
SMP NEGERI 4 WOLOWARU	50302631	SMP	Wolojita
SMP NEGERI 5 NANGAPANDA	50305686	SMP	Nangapanda
SMP NEGERI 5 WOLOWARU	50302630	SMP	Ndori
SMP NEGERI 6 NANGAPANDA	50305687	SMP	Nangapanda
SMP NEGERI 7 NANGAPANDA	69734399	SMP	Nangapanda
SMP NEGERI 8 NANGAPANDA	69734400	SMP	Nangapanda
SMP NEGERI AEWORA	69725940	SMP	Maurole
SMP NEGERI DETUKELI	50305407	SMP	Detukeli
SMP NEGERI DETUNGGALI	50305425	SMP	Wewaria
SMP NEGERI EKOAE	69938844	SMP	Wewaria
SMP NEGERI INE PARE	69786325	SMP	Detukeli
SMP NEGERI MAUKARO	50305416	SMP	Maukaro
SMP NEGERI MAUTENDA	50305426	SMP	Wewaria
SMP NEGERI PANCASILA PORA	50302613	SMP	Wolojita
SMP NEGERI SATU ATAP AEREA	50305423	SMP	Ndori
SMP NEGERI SATU ATAP DETUBELO	50309143	SMP	Lio Timur
SMP NEGERI SATU ATAP EKOREKO	50306099	SMP	Pulau Ende
SMP NEGERI SATU ATAP KOAWENA	50309142	SMP	Ende Timur
SMP NEGERI SATU ATAP LIGALEJO	50305688	SMP	Kota Baru
SMP NEGERI SATU ATAP MUNDINGGASA	50308520	SMP	Maukaro
SMP NEGERI SATU ATAP NGALUROGA	69948610	SMP	Ndona
SMP NEGERI SATU ATAP NGGEMO	50308810	SMP	Maukaro
SMP NEGERI SATU ATAP NUAMURI 2	50306097	SMP	Kelimutu
SMP NEGERI SATU ATAP NUAPU	50305432	SMP	Ndona Timur
SMP NEGERI SATU ATAP PASADOO	69734398	SMP	Detusoko
SMP NEGERI SATU ATAP RABURIA	50305412	SMP	Ende
SMP NEGERI SATU ATAP RATENGGOJI	50305431	SMP	Lepembusu Kelisoke
SMP NEGERI SATU ATAP SOKOLOO	50305430	SMP	Lepembusu Kelisoke
SMP NEGERI SATU ATAP TURUNALU	69906527	SMP	Detusoko
SMP NEGERI SATU ATAP WOLOARA	50305414	SMP	Kelimutu
SMP NEGERI SATU ATAP WOLOGAI	50306098	SMP	Ende
SMP NEGERI SATU ATAP WOLOOJA 3	50308522	SMP	Wolowaru
SMP NEGERI SEKOLENGO	50305422	SMP	Ndona Timur
SMP NEGERI SOKORIA	50305692	SMP	Maurole
SMP NEGERI TANADAKI	69964886	SMP	Ende
SMP NEGERI TONDANDORA	69906738	SMP	Ende
SMP SWASTA ADHYAKSA	50302672	SMP	Ende Tengah
SMP SWASTA DONA MART	70012314	SMP	Lio Timur
SMP SWASTA ISLAM MUTHMAINNAH	50302607	SMP	Ende Selatan
SMP SWASTA KATOLIK CHRISTOREGI	50305411	SMP	Ende Utara
SMP SWASTA KATOLIK DETUKELI	50302668	SMP	Detukeli
SMP SWASTA KATOLIK EMANUEL MAUTENDA	50305424	SMP	Wewaria
SMP SWASTA KATOLIK INEMETE	50302667	SMP	Nangapanda
SMP SWASTA KATOLIK MARSUDIRINI	50302657	SMP	Detusoko
SMP SWASTA KATOLIK MONI	50302636	SMP	Kelimutu
SMP SWASTA KATOLIK NIRMALA JOPU	50302663	SMP	Wolowaru
SMP SWASTA KATOLIK SANTA URSULA ENDE	50302606	SMP	Ende Tengah
SMP SWASTA KATOLIK ST ALOYSIUS WOLOTOPO	50302610	SMP	Ndona
SMP SWASTA KATOLIK WOLOJITA	50302661	SMP	Wolojita
SMP SWASTA KATOLIK WOLOTOLO	50302660	SMP	Detusoko
SMP SWASTA KATOLIK WOLOWARU	50302659	SMP	Wolowaru
SMP SWASTA KATOLIK YOS SUDARSO	50302669	SMP	Ende Tengah
SMP SWASTA KELIMUTU	50302605	SMP	Ende Timur
SMP SWASTA MADANI NDONDO	50305415	SMP	Kota Baru
SMP SWASTA NUSANTARA	50302614	SMP	Ende
SMP SWASTA REWARANGGA	50302612	SMP	Ende Timur
SMP SWASTA SINAR PELITA	50302611	SMP	Wewaria
SMP SWASTA TARUNA DESA	50302670	SMP	Detusoko
SMP SWASTA TRI DHARMA	50305413	SMP	Ende Tengah
SMPK ST. ANTONIUS NDONA	50305421	SMP	Ndona
SMPN HANGALANDE	69768279	SMP	Kota Baru
SMPN KELIWUMBU	69768278	SMP	Maurole
SMPN SATAP WOLOOJA 2	69768277	SMP	Wewaria
SPS PLAY GROUP BAHASA INGGRIS RAYMUND	69974584	SPS	Ende Timur
SPS. SINT. MAYKAEL	69946059	SPS	Ende Utara
TAUD Saqu Al Misykah	69990820	KB	Ende Timur
TK AETEKE	69991344	TK	Lio Timur
TK AMI WALISANGA ENDE	70055076	TK	Ende Selatan
TK ARNOLDUS JANSEN	69977490	TK	Wolowaru
TK BELUT SAKTI	69974571	TK	Detusoko
TK CINTA ABADI	69966364	TK	Wewaria
TK CINTA ANAK	69845092	TK	Ende
TK DEYNICA	70027352	TK	Lio Timur
TK EMBU TURU	70036062	TK	Detusoko
TK Harapan Baru	69845103	TK	Ende Selatan
TK HARAPAN BUNDA	70013338	TK	Ende Selatan
TK IDHATA WOLOWARU	50305512	TK	Wolowaru
TK JEO DUA	69946026	TK	Detukeli
TK KARTINI PUUPAU	50307733	TK	Nangapanda
TK KI HAJAR DEWANTARA NUAMURI	50305479	TK	Kelimutu
TK KURU KELI	70060114	TK	Maukaro
TK LOKADHIO	69946017	TK	Ndori
TK MARIA FATIMA KOANARA	50305704	TK	Kelimutu
TK MARIA VIRGO 2	50305436	TK	Ende Utara
TK MBETE KAKI	70041107	TK	Kota Baru
TK Melati	69845062	TK	Ende Timur
TK MUHAMADIYAH ENDE	70051200	TK	Ende Selatan
TK NAZARETH	70000043	TK	Ende Timur
TK NEGERI PEMBINA KOTA BARU	50306095	TK	Kota Baru
TK PELITA HATI EMBU NGENA	70003507	TK	Ende
TK PENA RIA	70035852	TK	Wewaria
TK PENABUR ST. DOMINIC KAMUBHEKA	70059694	TK	Maukaro
TK PUUKUNGU	69945438	TK	Nangapanda
TK Raburia	69845091	TK	Ende
TK RANORAMBA	69946067	TK	Ende
TK Rera Wete	69845088	TK	Maukaro
TK RHERHEJA 1	50305442	TK	Ende Timur
TK SANTO ANTONIUS WOLOORA	70024355	TK	Ende
TK Sare Pawe	69845194	TK	Ende Tengah
TK SATAP NUSANGGALA	50307730	TK	Kota Baru
TK SATU ATAP NDETUKUNE	69750497	TK	Nangapanda
TK St. AGUSTINUS	69946025	TK	Ndona Timur
TK ST. MARTHA SOKORIA	50305488	TK	Maurole
TK ST. PAULUS NANGAKEO	69734395	TK	Nangapanda
TK ST. THEODORUS	50305481	TK	Lio Timur
TK St. Theresia	69845138	TK	Ndona Timur
TK ST. VINCENTIUS RATESUBA	50305483	TK	Maukaro
TK TAMBORA	69960988	TK	Nangapanda
TK TANA NUWA	50305478	TK	Kelimutu
TK TANAROGA	70036914	TK	Lio Timur
TK TEKAD	69845094	TK	Ende
TK TERPADU WOLOOJA 2	70051845	TK	Wewaria
TK TINA BANI	50305446	TK	Ende
TK TRINITAS OJA	70014377	TK	Nangapanda
TK YAPERTIF	50305467	TK	Ende Tengah
TK. Bata Laki Wologai	69845077	TK	Detusoko
TK. MALAWARU	69945985	TK	Nangapanda
TK. OSOSOMBO LOKOBOKO	69845067	TK	Ndona
TK. Pertiwi Cab. Ende	69845060	TK	Ende Selatan
TK. PUUMBARA	69952709	TK	Ende Utara
TK. ROMAREA	69945441	TK	Nangapanda
TK. Salib Suci Maurole	69845071	TK	Maurole
TK. SANTO MATHEUS AEMURI	69972374	TK	Wewaria
TK. SANTO YOSEPH AEISA	69963992	TK	Ende Utara
TK. SATAP KARTINI KELITEMBU	69845081	TK	Wewaria
TK. SIGARIA	69965824	TK	Ende
TK. ST. GETRUDIS KEBIRANGGA	69975421	TK	Maukaro
TK. St. MARIA SATAP DETUBELA	69845080	TK	Wewaria
TK. ST. MAXIMILLIANUS MARIA KOLBE RANGGATALO	70000110	TK	Lio Timur
TK. ST. PETRUS PUUKOU	69845057	TK	Nangapanda
TK. St. YOHANES EKOAE	69953878	TK	Wewaria
TK. TAUSIA NDANGAKAPA	69945439	TK	Nangapanda
TK.KARTIKA VII-8 ENDE	69845065	TK	Ende Utara
TK.Kusuma Udayana 2	69845064	TK	Ende Tengah
TK.SATAP ADE IRMA	69845070	TK	Ndori
TK.SATAP NDETUNDORA I	69845059	TK	Ende
TK.Satap Raaweka	69845078	TK	Wewaria
TK.SATAP WELAMOSA	69845079	TK	Wewaria
TK.ST.Bernadetha Wolomage	69845074	TK	Detusoko
TK.ST.FRANSISKUS ASSISI	69845073	TK	Kota Baru
TK.ST.PAULUS VI	69845076	TK	Detusoko
TK.ST.THERESIA WOLOFEO	69845075	TK	Detusoko
TK.Yohanes Pemandi	69845072	TK	Maurole
TKN PEMBINA ENDE	50305463	TK	Ende Timur
TKS ANAK YESUS JOPU	50305513	TK	Wolowaru
TKS BUNGA BANGSA	50305468	TK	Ende Tengah
TKS CHRISTOREGI	50305474	TK	Ende Selatan
TKS DEWI SARTIKA PORA	50305520	TK	Wolojita
TKS DHARMA WANITA ENDE	50305440	TK	Ende Timur
TKS DHARMA WANITA MBULILOO	50305516	TK	Wolowaru
TKS DHARMA WANITA NANGAPANDA	50305492	TK	Nangapanda
TKS DHARMA WANITA TENDA	50305521	TK	Wolojita
TKS DHARMA WANITA WOLOJITA	50305522	TK	Wolojita
TKS ISLAM TARBIYAH	50305437	TK	Ende Utara
TKS KAPOLANDO	50305502	TK	Ndona
TKS KARTINI NGGELA	50305519	TK	Wolojita
TKS LEPEMBUSU	50305452	TK	Detusoko
TKS MANUBARA	50305508	TK	Pulau Ende
TKS MANUSAMA WOLOHEPO	50305511	TK	Wolowaru
TKS MARDATILLAH	50305494	TK	Nangapanda
TKS MARIA VIRGO 1	50305503	TK	Ndona
TKS MAUBASA	50305439	TK	Ndori
TKS MUSLIMAT NU FATIMAH AZZAHRAH	50305466	TK	Ende Selatan
TKS NIRMALA	50305493	TK	Nangapanda
TKS PUTRA DUNGGA	50305501	TK	Ende Timur
TKS REDODORI	50305506	TK	Pulau Ende
TKS RENDORATERUA	50305507	TK	Pulau Ende
TKS RHERHEJA 2	50305443	TK	Ende Timur
TKS RINDIWAWO	50305518	TK	Wolowaru
TKS SANDHY PUTRA	50305470	TK	Ende Tengah
TKS SANTA AGNES	50305471	TK	Ende Tengah
TKS SANTA HELEN WOLOWARU	50305514	TK	Wolowaru
TKS SANTA MARIA MAGDALENA SOFIA BARAT	50305459	TK	Ende
TKS SANTA YASINTHA	50305510	TK	Wewaria
TKS SARE ORHA	50305460	TK	Ende
TKS SATAP SDN PUUTARA	50307734	TK	Pulau Ende
TKS SATAP ST. PAULUS MUKUSAKI	50307729	TK	Wewaria
TKS SATAP WOLOKOLI	50307736	TK	Wewaria
TKS SATOJOTO	50305455	TK	Ende
TKS SATU ATAP DETUBELO	69734393	TK	Lio Timur
TKS SATU ATAP KEKAWII	69734392	TK	Ende
TKS SATU ATAP KOMBO	50307727	TK	Wewaria
TKS SATU ATAP NUMBA 1	50305495	TK	Nangapanda
TKS ST. ARNOLDUS YANSEN MBOMBA	50305433	TK	Ende Utara
TKS ST. FRANSISKUS XAVERIUS WOLOTOLO	50305454	TK	Detusoko
TKS ST. MARIA NANGAMBOA	50305489	TK	Nangapanda
TKS ST. MARIA WOLOARE	50305445	TK	Ende Utara
TKS ST. MARTHA MOLUTANGGA	50307722	TK	Wewaria
TKS ST. MARTINUS WATUMITE	50305497	TK	Nangapanda
TKS ST. MIKAEL WOLOLELE B	50305515	TK	Wolowaru
TKS ST. SISILIA AEGANA	69734397	TK	Wewaria
TKS ST. YANUARIUS WONDA	50305447	TK	Ndori
TKS ST.FRANSISKUS XAVERIUS WOLOTOPO	50305504	TK	Ndona
TKS SYALOOM	50305464	TK	Ende Tengah
TKS WOLOOJA	50305517	TK	Wolowaru`;

// Parse data sekolah
const schools = RAW_DATA.split('\n').filter(l => l.trim()).map((line, idx) => {
  const parts = line.split('\t');
  return {
    id: idx + 1,
    nama: (parts[0] || '').trim(),
    npsn: (parts[1] || '').trim(),
    bentuk: (parts[2] || '').trim(),
    kecamatan: (parts[3] || '').trim()
  };
});

// ============ DAFTAR JUDUL OTOMATIS ============
const PREDEFINED_TITLES = {
  foto: [
    "Upacara Bendera",
    "Kegiatan Belajar Mengajar",
    "Perpustakaan Sekolah",
    "Laboratorium Komputer",
    "Kantin Sekolah",
    "Lapangan Olahraga",
    "Musholla / Ruang Ibadah",
    "Ruang Guru",
    "Ruang Kepala Sekolah",
    "Ruang UKS",
    "Ekstrakurikuler",
    "Kunjungan Edukatif",
    "Peringatan Hari Besar",
    "Lomba Antar Kelas",
    "Wisuda / Pelepasan Siswa",
    "Rapat Dewan Guru",
    "Kegiatan Pramuka",
    "Gotong Royong Sekolah",
    "Fasilitas Sekolah",
    "Prestasi Siswa",
    "Lainnya (Ketik Manual)"
  ],
  video: [
    "Video Profil Sekolah",
    "Video Kegiatan Upacara",
    "Video Pembelajaran di Kelas",
    "Video Kegiatan Ekstrakurikuler",
    "Video Peringatan Hari Besar",
    "Video Lomba / Kompetisi",
    "Video Kunjungan Edukatif",
    "Video Tutorial / Edukasi",
    "Video Dokumentasi Kegiatan",
    "Video Wawancara / Testimoni",
    "Video Pengumuman Sekolah",
    "Lainnya (Ketik Manual)"
  ],
  dokumen: [
    "Kurikulum Sekolah",
    "Data Siswa",
    "Data Guru dan Tenaga Kependidikan",
    "Laporan Keuangan",
    "Rencana Kerja Sekolah (RKS)",
    "Program Kerja Tahunan",
    "Laporan Evaluasi",
    "Surat Keputusan (SK)",
    "Notulen Rapat",
    "Dokumen Akreditasi",
    "Dokumen BOS",
    "Panduan / Pedoman",
    "Formulir Pendaftaran",
    "Kalender Pendidikan",
    "Struktur Organisasi",
    "Lainnya (Ketik Manual)"
  ]
};

// ============ AUTH SYSTEM ============
const AUTH_KEY = 'sisfo_auth';
const MEDIA_KEY = 'sisfo_media';
const PASS_KEY = 'sisfo_passwords';

const DEFAULT_SCHOOL_PASS = 'sekolah123';
const DEFAULT_ADMIN_PASS = 'admin2026';

function getPasswords() {
  return JSON.parse(localStorage.getItem(PASS_KEY) || '{}');
}
function savePasswords(p) {
  localStorage.setItem(PASS_KEY, JSON.stringify(p));
}
function getSchoolPassword(npsn) {
  const p = getPasswords();
  return p[npsn] || DEFAULT_SCHOOL_PASS;
}
function setSchoolPassword(npsn, pass) {
  const p = getPasswords();
  p[npsn] = pass;
  savePasswords(p);
}

function getMedia() {
  return JSON.parse(localStorage.getItem(MEDIA_KEY) || '{}');
}
function saveMedia(m) {
  localStorage.setItem(MEDIA_KEY, JSON.stringify(m));
}

let currentUser = null;

// ============ DETEKSI HALAMAN ============
const isLoginPage = document.getElementById('loginPage') !== null;
const isDashboardPage = document.getElementById('mainApp') !== null;

// ============ LOGIN (Hanya di login.html) ============
if (isLoginPage) {
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
}

function handleLogin(e) {
  if (e) e.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  const errEl = document.getElementById('loginError');
  
  if (user.toLowerCase() === 'admin' && pass === DEFAULT_ADMIN_PASS) {
    currentUser = { type: 'admin' };
    localStorage.setItem(AUTH_KEY, JSON.stringify(currentUser));
    window.location.href = 'dashboard.html';
    return;
  }
  
  const school = schools.find(s => s.npsn === user);
  if (school && pass === getSchoolPassword(school.npsn)) {
    currentUser = { type: 'sekolah', schoolId: school.id, school };
    localStorage.setItem(AUTH_KEY, JSON.stringify(currentUser));
    window.location.href = 'dashboard.html';
    return;
  }
  
  errEl.classList.add('show');
  setTimeout(() => errEl.classList.remove('show'), 3000);
}

// ============ LOGOUT (Hanya di dashboard.html) ============
function handleLogout() {
  if (!confirm('Yakin ingin logout?')) return;
  currentUser = null;
  localStorage.removeItem(AUTH_KEY);
  window.location.href = 'login.html';
}

// ============ SHOW APP (Hanya di dashboard.html) ============
function showApp() {
  if (currentUser.type === 'admin') {
    document.getElementById('userRole').textContent = 'ADMIN DINAS';
    document.getElementById('userName').textContent = 'Administrator';
    document.getElementById('adminSchoolList').style.display = 'block';
    document.getElementById('sekolahMediaSection').style.display = 'none';
  } else {
    document.getElementById('userRole').textContent = 'SEKOLAH';
    document.getElementById('userName').textContent = currentUser.school.nama;
    document.getElementById('adminSchoolList').style.display = 'none';
    document.getElementById('sekolahMediaSection').style.display = 'block';
  }
  
  renderDashboard();
  if (currentUser.type === 'admin') renderSchoolTable();
  else renderMyMedia();
}

// ============ AUTO CHECK LOGIN (Hanya di dashboard.html) ============
if (isDashboardPage) {
  const savedAuth = localStorage.getItem(AUTH_KEY);
  if (savedAuth) {
    try {
      currentUser = JSON.parse(savedAuth);
      if (currentUser.type === 'sekolah') {
        currentUser.school = schools.find(s => s.id === currentUser.schoolId);
      }
      if (currentUser && (currentUser.type === 'admin' || currentUser.school)) {
        showApp();
      } else {
        window.location.href = 'login.html';
      }
    } catch(e) {
      window.location.href = 'login.html';
    }
  } else {
    window.location.href = 'login.html';
  }
}

// ============ DASHBOARD ============
function renderDashboard() {
  const grid = document.getElementById('dashboardGrid');
  const media = getMedia();
  
  if (currentUser.type === 'admin') {
    const totalSchools = schools.length;
    const schoolsWithMedia = Object.keys(media).filter(id => {
      const m = media[id];
      return (m.foto?.length || 0) + (m.video?.length || 0) + (m.dokumen?.length || 0) > 0;
    }).length;
    const totalMedia = Object.values(media).reduce((sum, m) => 
      sum + (m.foto?.length || 0) + (m.video?.length || 0) + (m.dokumen?.length || 0), 0);
    const totalFoto = Object.values(media).reduce((sum, m) => sum + (m.foto?.length || 0), 0);
    
    grid.innerHTML = `
      <div class="dash-card">
        <div class="dash-label">🏫 Total Sekolah</div>
        <div class="dash-value">${totalSchools}</div>
        <div class="dash-sub">Seluruh satuan pendidikan</div>
      </div>
      <div class="dash-card accent">
        <div class="dash-label"> Sekolah dengan Media</div>
        <div class="dash-value">${schoolsWithMedia}</div>
        <div class="dash-sub">${((schoolsWithMedia/totalSchools)*100).toFixed(1)}% dari total</div>
      </div>
      <div class="dash-card success">
        <div class="dash-label">📊 Total Media</div>
        <div class="dash-value">${totalMedia}</div>
        <div class="dash-sub">Foto, video, dan dokumen</div>
      </div>
      <div class="dash-card warning">
        <div class="dash-label"> Total Foto</div>
        <div class="dash-value">${totalFoto}</div>
        <div class="dash-sub">Dari seluruh sekolah</div>
      </div>
    `;
  } else {
    const m = media[currentUser.schoolId] || { foto: [], video: [], dokumen: [] };
    const total = (m.foto?.length || 0) + (m.video?.length || 0) + (m.dokumen?.length || 0);
    grid.innerHTML = `
      <div class="dash-card">
        <div class="dash-label">📸 Foto</div>
        <div class="dash-value">${m.foto?.length || 0}</div>
      </div>
      <div class="dash-card accent">
        <div class="dash-label">🎬 Video</div>
        <div class="dash-value">${m.video?.length || 0}</div>
      </div>
      <div class="dash-card success">
        <div class="dash-label">📄 Dokumen</div>
        <div class="dash-value">${m.dokumen?.length || 0}</div>
      </div>
      <div class="dash-card warning">
        <div class="dash-label"> Total Media</div>
        <div class="dash-value">${total}</div>
      </div>
    `;
  }
}

// ============ ADMIN: SCHOOL TABLE ============
let filteredSchools = [...schools];
let currentPage = 1;
const perPage = 25;

function renderSchoolTable() {
  const q = document.getElementById('searchSchool').value.toLowerCase();
  const bentuk = document.getElementById('filterBentuk').value;
  const kec = document.getElementById('filterKec').value;
  
  filteredSchools = schools.filter(s => {
    const matchQ = !q || s.nama.toLowerCase().includes(q) || s.npsn.includes(q) || s.kecamatan.toLowerCase().includes(q);
    const matchB = !bentuk || s.bentuk === bentuk;
    const matchK = !kec || s.kecamatan === kec;
    return matchQ && matchB && matchK;
  });
  
  const tbody = document.getElementById('schoolTableBody');
  const totalPages = Math.ceil(filteredSchools.length / perPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage - 1) * perPage;
  const pageData = filteredSchools.slice(start, start + perPage);
  const media = getMedia();
  
  if (!pageData.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty">Tidak ada data</td></tr>';
  } else {
    tbody.innerHTML = pageData.map(s => {
      const m = media[s.id] || { foto: [], video: [], dokumen: [] };
      const count = (m.foto?.length || 0) + (m.video?.length || 0) + (m.dokumen?.length || 0);
      return `
        <tr onclick="viewSchoolMedia(${s.id})">
          <td><strong>${escapeHtml(s.nama)}</strong></td>
          <td><code>${s.npsn}</code></td>
          <td><span class="badge badge-${s.bentuk}">${s.bentuk}</span></td>
          <td>${escapeHtml(s.kecamatan)}</td>
          <td>${count > 0 ? `<span class="badge badge-SD">${count} media</span>` : '<span style="color:var(--muted); font-size:0.8rem;">Belum ada</span>'}</td>
        </tr>
      `;
    }).join('');
  }
  
  const pag = document.getElementById('pagination');
  if (totalPages <= 1) { pag.innerHTML = ''; }
  else {
    let html = `<button class="page-btn" onclick="goPage(${currentPage-1})" ${currentPage===1?'disabled':''}>‹</button>`;
    for (let i = Math.max(1, currentPage-2); i <= Math.min(totalPages, currentPage+2); i++) {
      html += `<button class="page-btn ${i===currentPage?'active':''}" onclick="goPage(${i})">${i}</button>`;
    }
    html += `<button class="page-btn" onclick="goPage(${currentPage+1})" ${currentPage===totalPages?'disabled':''}>›</button>`;
    pag.innerHTML = html;
  }
}

function goPage(p) {
  const totalPages = Math.ceil(filteredSchools.length / perPage);
  if (p < 1 || p > totalPages) return;
  currentPage = p;
  renderSchoolTable();
}

function viewSchoolMedia(schoolId) {
  const school = schools.find(s => s.id === schoolId);
  if (!school) return;

  document.getElementById('adminSchoolList').style.display = 'none';
  document.getElementById('sekolahMediaSection').style.display = 'block';

  const origUser = currentUser;
  currentUser = { type: 'sekolah', schoolId, school };
  
  renderMyMedia();
  showSection('dashboard');

  const section = document.getElementById('sekolahMediaSection');
  if (!document.getElementById('backBtn')) {
    const btn = document.createElement('button');
    btn.id = 'backBtn';
    btn.className = 'btn btn-outline btn-sm';
    btn.style.marginBottom = '1rem';
    btn.textContent = '← Kembali ke Daftar Sekolah';
    btn.onclick = () => {
      currentUser = origUser;
      document.getElementById('adminSchoolList').style.display = 'block';
      document.getElementById('sekolahMediaSection').style.display = 'none';
      btn.remove();
      renderDashboard();
      renderSchoolTable(); 
    };
    section.insertBefore(btn, section.firstChild);
  }
}

// ============ SEKOLAH: MY MEDIA ============
let currentMediaTab = 'foto';
let currentFormType = null;

function renderMyMedia() {
  if (!currentUser || currentUser.type !== 'sekolah') return;
  const m = getMedia()[currentUser.schoolId] || { foto: [], video: [], dokumen: [] };
  
  document.getElementById('countFoto').textContent = m.foto?.length || 0;
  document.getElementById('countVideo').textContent = m.video?.length || 0;
  document.getElementById('countDokumen').textContent = m.dokumen?.length || 0;
  
  renderFoto(m.foto || []);
  renderVideo(m.video || []);
  renderDokumen(m.dokumen || []);
}

function switchMediaTab(tab, btn) {
  currentMediaTab = tab;
  document.querySelectorAll('#sekolahMediaSection .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#sekolahMediaSection .section').forEach(s => s.classList.remove('active'));
  document.getElementById('media-' + tab).classList.add('active');
}

function renderFoto(items) {
  const grid = document.getElementById('gridFoto');
  if (!items.length) {
    grid.innerHTML = '<div class="empty" style="grid-column:1/-1;"><div class="empty-icon"></div>Belum ada foto</div>';
    return;
  }
  grid.innerHTML = items.map(i => `
    <div class="media-card">
      <div class="media-thumb" onclick="previewMedia('foto',${i.id})">
        <img src="${i.url}" alt="${escapeHtml(i.title)}" onerror="this.src='https://via.placeholder.com/400x250?text=Foto'">
      </div>
      <div class="media-body">
        <div class="media-title">${escapeHtml(i.title)}</div>
        <div class="media-desc">${escapeHtml(i.desc || '')}</div>
      </div>
      <div class="media-actions">
        <button class="btn btn-sm btn-outline" onclick="previewMedia('foto',${i.id})">Lihat</button>
        <button class="btn btn-sm btn-danger" onclick="hapusMedia('foto',${i.id})">Hapus</button>
      </div>
    </div>
  `).join('');
}

function renderVideo(items) {
  const grid = document.getElementById('gridVideo');
  if (!items.length) {
    grid.innerHTML = '<div class="empty" style="grid-column:1/-1;"><div class="empty-icon">🎬</div>Belum ada video</div>';
    return;
  }
  grid.innerHTML = items.map(i => {
    const ytId = extractYoutubeId(i.url);
    const embedUrl = ytId ? `https://www.youtube.com/embed/${ytId}` : i.url;
    return `
      <div class="media-card">
        <div class="media-thumb">
          <div class="video-wrap"><iframe src="${embedUrl}" allowfullscreen></iframe></div>
        </div>
        <div class="media-body">
          <div class="media-title">${escapeHtml(i.title)}</div>
          <div class="media-desc">${escapeHtml(i.desc || '')}</div>
        </div>
        <div class="media-actions">
          <button class="btn btn-sm btn-outline" onclick="previewMedia('video',${i.id})">Perbesar</button>
          <button class="btn btn-sm btn-danger" onclick="hapusMedia('video',${i.id})">Hapus</button>
        </div>
      </div>
    `;
  }).join('');
}

function renderDokumen(items) {
  const grid = document.getElementById('gridDokumen');
  if (!items.length) {
    grid.innerHTML = '<div class="empty" style="grid-column:1/-1;"><div class="empty-icon">📄</div>Belum ada dokumen</div>';
    return;
  }
  grid.innerHTML = items.map(i => `
    <div class="media-card">
      <div class="media-thumb"><div class="doc-icon">📄</div></div>
      <div class="media-body">
        <div class="media-title">${escapeHtml(i.title)}</div>
        <div class="media-desc">${escapeHtml(i.desc || '')}</div>
      </div>
      <div class="media-actions">
        <button class="btn btn-sm btn-outline" onclick="previewMedia('dokumen',${i.id})">Buka</button>
        <a href="${i.url}" target="_blank" class="btn btn-sm" style="text-decoration:none;">↗</a>
        <button class="btn btn-sm btn-danger" onclick="hapusMedia('dokumen',${i.id})">Hapus</button>
      </div>
    </div>
  `).join('');
}

// ============ HANDLE TITLE SELECT ============
function handleTitleSelect() {
  const select = document.getElementById('fTitleSelect');
  const customGroup = document.getElementById('fTitleCustomGroup');
  const customInput = document.getElementById('fTitleCustom');
  
  if (select.value === 'Lainnya (Ketik Manual)') {
    customGroup.style.display = 'block';
    customInput.required = true;
  } else {
    customGroup.style.display = 'none';
    customInput.required = false;
    customInput.value = '';
  }
}

// ============ MEDIA FORM ============
function openMediaForm(type) {
  currentFormType = type;
  const titles = { foto: 'Tambah Foto', video: 'Tambah Video', dokumen: 'Tambah Dokumen' };
  document.getElementById('formTitle').textContent = titles[type];
  
  document.getElementById('fDesc').value = '';
  document.getElementById('fUrl').value = '';
  document.getElementById('fFile').value = '';
  document.getElementById('fTitleCustom').value = '';
  document.getElementById('fTitleCustomGroup').style.display = 'none';
  
  const select = document.getElementById('fTitleSelect');
  select.innerHTML = '<option value="">-- Pilih Judul --</option>';
  PREDEFINED_TITLES[type].forEach(title => {
    const option = document.createElement('option');
    option.value = title;
    option.textContent = title;
    select.appendChild(option);
  });
  
  document.getElementById('fFileGroup').style.display = type === 'foto' ? 'block' : 'none';
  const hints = {
    foto: 'URL gambar atau upload file',
    video: 'URL YouTube (contoh: https://www.youtube.com/watch?v=...)',
    dokumen: 'URL embed Google Drive'
  };
  document.getElementById('fUrlHint').textContent = hints[type];
  document.getElementById('fUrlLabel').textContent = type === 'foto' ? 'URL Gambar' : (type === 'video' ? 'URL YouTube' : 'URL Dokumen');
  
  document.getElementById('formModal').classList.add('active');
}

function closeForm() {
  document.getElementById('formModal').classList.remove('active');
}

function submitMedia(e) {
  e.preventDefault();
  
  const titleSelect = document.getElementById('fTitleSelect').value;
  const titleCustom = document.getElementById('fTitleCustom').value;
  const title = titleSelect === 'Lainnya (Ketik Manual)' ? titleCustom : titleSelect;
  
  const desc = document.getElementById('fDesc').value;
  const fileInput = document.getElementById('fFile');
  let url = document.getElementById('fUrl').value;
  
  const finish = (finalUrl) => {
    const media = getMedia();
    if (!media[currentUser.schoolId]) media[currentUser.schoolId] = { foto: [], video: [], dokumen: [] };
    media[currentUser.schoolId][currentFormType].push({
      id: Date.now(),
      title, desc,
      url: finalUrl
    });
    saveMedia(media);
    renderMyMedia();
    renderDashboard();
    closeForm();
  };
  
  if (currentFormType === 'foto' && fileInput.files[0] && !url) {
    const reader = new FileReader();
    reader.onload = ev => finish(ev.target.result);
    reader.readAsDataURL(fileInput.files[0]);
  } else if (currentFormType === 'video') {
    const ytId = extractYoutubeId(url);
    finish(ytId ? `https://www.youtube.com/embed/${ytId}` : url);
  } else {
    finish(url);
  }
}

function hapusMedia(type, id) {
  if (!confirm('Hapus item ini?')) return;
  const media = getMedia();
  if (!media[currentUser.schoolId]) return;
  media[currentUser.schoolId][type] = media[currentUser.schoolId][type].filter(i => i.id !== id);
  saveMedia(media);
  renderMyMedia();
  renderDashboard();
}

function previewMedia(type, id) {
  const media = getMedia()[currentUser.schoolId];
  if (!media) return;
  const item = media[type].find(i => i.id === id);
  if (!item) return;
  
  let html = '';
  if (type === 'foto') {
    html = `<img src="${item.url}" style="width:100%; display:block;"><div style="padding:1rem;"><h3>${escapeHtml(item.title)}</h3><p style="color:var(--muted);">${escapeHtml(item.desc || '')}</p></div>`;
  } else if (type === 'video') {
    const ytId = extractYoutubeId(item.url);
    const embedUrl = ytId ? `https://www.youtube.com/embed/${ytId}` : item.url;
    html = `<div style="position:relative; padding-bottom:56.25%;"><iframe src="${embedUrl}" style="position:absolute; inset:0; width:100%; height:100%; border:0;" allowfullscreen></iframe></div><div style="padding:1rem;"><h3>${escapeHtml(item.title)}</h3></div>`;
  } else {
    html = `<iframe src="${item.url}" style="width:100%; height:70vh; border:0;"></iframe><div style="padding:1rem;"><h3>${escapeHtml(item.title)}</h3></div>`;
  }
  document.getElementById('previewContent').innerHTML = html;
  document.getElementById('previewModal').classList.add('active');
}

function closePreview() {
  document.getElementById('previewModal').classList.remove('active');
}

function extractYoutubeId(url) {
  const m = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

// ============ PROFILE & PASSWORD ============
function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('section-' + name).classList.add('active');
  
  if (name === 'profile' && currentUser.type === 'sekolah') {
    document.getElementById('profileSchoolName').textContent = currentUser.school.nama;
    document.getElementById('profileNpsn').textContent = currentUser.school.npsn;
    document.getElementById('profileBentuk').textContent = currentUser.school.bentuk;
    document.getElementById('profileKec').textContent = currentUser.school.kecamatan;
    document.getElementById('profileRole').textContent = 'Sekolah';
  } else if (name === 'profile' && currentUser.type === 'admin') {
    document.getElementById('profileSchoolName').textContent = 'Administrator Dinas Pendidikan';
    document.getElementById('profileNpsn').textContent = '-';
    document.getElementById('profileBentuk').textContent = '-';
    document.getElementById('profileKec').textContent = 'Kabupaten Ende';
    document.getElementById('profileRole').textContent = 'Admin Dinas';
  }
}

function changePassword() {
  const oldPass = document.getElementById('oldPass').value;
  const newPass = document.getElementById('newPass').value;
  const confirmPass = document.getElementById('confirmPass').value;
  const msgEl = document.getElementById('passMsg');
  
  if (currentUser.type === 'admin') {
    if (oldPass !== DEFAULT_ADMIN_PASS) {
      msgEl.innerHTML = '<div class="alert alert-warning">Password lama salah!</div>';
      return;
    }
  } else {
    if (oldPass !== getSchoolPassword(currentUser.school.npsn)) {
      msgEl.innerHTML = '<div class="alert alert-warning">Password lama salah!</div>';
      return;
    }
  }
  
  if (newPass.length < 6) {
    msgEl.innerHTML = '<div class="alert alert-warning">Password minimal 6 karakter!</div>';
    return;
  }
  if (newPass !== confirmPass) {
    msgEl.innerHTML = '<div class="alert alert-warning">Konfirmasi password tidak cocok!</div>';
    return;
  }
  
  if (currentUser.type === 'admin') {
    msgEl.innerHTML = '<div class="alert" style="background:#d1fae5; color:#065f46;">✓ Password admin berhasil diubah (simulasi)</div>';
  } else {
    setSchoolPassword(currentUser.school.npsn, newPass);
    msgEl.innerHTML = '<div class="alert" style="background:#d1fae5; color:#065f46;">✓ Password berhasil diubah!</div>';
  }
  
  document.getElementById('oldPass').value = '';
  document.getElementById('newPass').value = '';
  document.getElementById('confirmPass').value = '';
}

// ============ UTILITIES ============
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ============ FILTER EVENTS (Hanya di dashboard.html) ============
if (isDashboardPage) {
  document.getElementById('searchSchool').addEventListener('input', () => { currentPage = 1; renderSchoolTable(); });
  document.getElementById('filterBentuk').addEventListener('change', () => { currentPage = 1; renderSchoolTable(); });
  document.getElementById('filterKec').addEventListener('change', () => { currentPage = 1; renderSchoolTable(); });

  const bentukSet = new Set(schools.map(s => s.bentuk));
  const kecSet = new Set(schools.map(s => s.kecamatan));
  const bentukSelect = document.getElementById('filterBentuk');
  const kecSelect = document.getElementById('filterKec');
  [...bentukSet].sort().forEach(b => {
    const opt = document.createElement('option');
    opt.value = b; opt.textContent = b;
    bentukSelect.appendChild(opt);
  });
  [...kecSet].sort().forEach(k => {
    const opt = document.createElement('option');
    opt.value = k; opt.textContent = k;
    kecSelect.appendChild(opt);
  });

  document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('click', e => {
      if (e.target === m) m.classList.remove('active');
    });
  });
}// ============ LOAD FOOTER DINAMIS ============
async function loadFooter() {
  try {
    const response = await fetch('footer.html');
    if (response.ok) {
      const footerHTML = await response.text();
      const footerContainer = document.getElementById('footer-container');
      if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
      }
    }
  } catch (error) {
    console.warn('Footer tidak dapat dimuat:', error);
  }
}

// Panggil fungsi load footer saat halaman dimuat
loadFooter();