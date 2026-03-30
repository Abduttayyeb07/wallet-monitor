import dotenv from "dotenv";

dotenv.config();

const DEFAULT_WALLETS = [
  "zig12p2ycqxz2v2lcznuw0vh60qkyy2mzfdw8fxa92",
  "zig1r3wdrz2ufjcf80fekd7eeu434c238aekkzemst",
  "zig1zm00h4n9vsfs6m5ld9ha2nwnqkt4gn8v3fe46q",
  "zig138tn9ljugg0gumc3k4elqjzeen7r42qf7kmz59",
  "zig1390jn4me32tyqhgepgzlaaw3xv4l0n9ggw55tw",
  "zig13xpqenxlmsxu4yzxg70azcw4wdktlpx9jpse73",
  "zig15h6ct7fflcrcjp276s5ndhtaxerju5fvgqt2rd",
  "zig16nwjxpdvjzltql09j2d5wvcmja5lnjhs7m72y4",
  "zig17anlcxku73zwq468jkjunelju92au44du854h7",
  "zig18slm0etzj57x96a0sevdhlr7v6v0zwfzxmwr9n",
  "zig190vnjk8yshchrt3s0484tk0yn56lmu66rkkf2n",
  "zig1933cypv70v5j3rzmfcz0ya0te0zmepjpkf5dcn",
  "zig1a7y2x8vsgulvhx7selwng9hth00jdnkrhkp2r9",
  "zig1cvx8gavrhdzx5e3dtsag4gzhzk2mms8tgdjye3",
  "zig1e38t0ntex34ye0kprxgtrz4pdsudmf3r8eg5kd",
  "zig1epmfuv96tkllcch64ncx99ay94aywu04c2e2k2",
  "zig1fckundc8na396r03fvmvxzvkh9zxh224k5g06w",
  "zig1jdfqfqnmrtujrv3srlenxemxpetaljemcqcxs8",
  "zig1juja9x3m564sedt8yvcwvyw9wct5t2jgyrj5su",
  "zig1l9l6ztayaeservh407jgy5t0ek32rva5edsajn",
  "zig1ltvxkkqhr86gkvs2f2vmffvlqav4lr3dtezadp",
  "zig1n75g6fl6rar2n53xk7krcedq88kat9le3xrurn",
  "zig1n9twq5hdgazfjfnc9ek2vjjtxuecz4f9afv068",
  "zig1nj3v7qddr37gnw85vtdmkegc80kwejzpsx2q5u",
  "zig1nl2lnq55j8gvmdknarcwwns2dqx8jdvp4uj8z2",
  "zig1nze0a0f9uggrpk4t7veru5t2dj2vaztru3yngg",
  "zig1tx59jm0xr99hl206j7aw66jns22apdt20nrqnc",
  "zig1wx44qgkyh0w6tlwpkeh4dlwxlarx4670r78rhz",
  "zig120m322z5mcgs8p097rypps3weqpwgq0rmtl3ct",
  "zig13pdqt90wj3lf6zc890f2lhl6vkyc0pj8hlkjz0",
  "zig1c0e5dukkcxyeqrz4e6j98h8s7hy87nn9x4rjth",
  "zig1eatzqs976fe2l6ncfmv9cdnnfe6aejg9q0ej4f",
  "zig1lg0uwmkkjergwypwgq20lx7j07j75ac6945wjm",
  "zig1mhe3kf3wse3w7w5g5gelm9rxny7nqmy9jpdfdh",
  "zig1mmd5ce2085lxm6trt9w8gzfw3ssu65xx74eqf4",
  "zig1pkwpk2h0x8vvv8yxqllqmzhw2tnvc4t07wcw78",
  "zig1q4fnkxwexxgh2qa26dxczwrjk4eteaugs0v9al",
  "zig1sglesjalrw6jz44vmsnuazt95tlvaj9qsj3gvk",
  "zig1yahhr05ff677ywyd0zkrjwv86gyuqutuydgg9q",
  "zig106n9vafuf2yd8vlrx7u9q0jqm4q5pscsusk0hn",
  "zig1fml2sdps6dj0aqfrhtq9zekkzvkts84cnjsw9p",
  "zig1nrq6z9wr48hpcnnp4dxjvs8g3g03pnxm2r8aus",
  "zig1wv52k5468ysdmjng3k565w7gyqyl4rnsun7pht",
  "zig1zfj8gxdx2fkpvgy06r2953eytmg7ngk59vrx67",
  "zig109peuhfhgn6y569ffvedezrz8dlu2taj4ctkdf",
  "zig1tm9hckgnq23f03f8ts00eazwdr2fw6x7yy5elk",
  "zig1vn98xfxhkyjjdz38qjyj2usuey2upnvuq47trh",
  "zig155svs6sgxe55rnvs6ghprtqu0mh69kehze2lzt",
  "zig17qd2tcfez40qqz5whsca62tjf65c9lu3gw8wsz",
  "zig1zecauzyzm7tyu3waulvhkw0xf7ppmpn6drsvpq",
  "zig14xt6rat7rll779nqdqy7qv0enssx4fgpu9y4pe",
  "zig1a8z78uyvpydk9rd3l7fqnv3zrmp4fn437d07tj",
  "zig1fdp9wxu48n6hsk87xa9j7ftmjc5kvj85023mv2",
  "zig1mndllnsfda5c6d02adfnl60su4xkqny58nhkj7",
  "zig1sjaulnf2asntv5myg2kuz80mstahgz9g6qtk67",
  "zig1u5w57vs97y0jfj2ddxvaa5j3w24pcsf2gj6yhl",
  "zig1ue2gteqp0cvh4ptvwp6smwkfehdjc3gexhrpg6",
  "zig1wtzpkeu7gpk0x2q9hquqa96cdzxhymvpe828gl",
  "zig1xwsr86pt729c5f0x5tny0sgv2c7v3sny4lwnzg",
  "zig1y275wmmukxyqdhumwk05pa6xjkfku66rtqfslp",
  "zig145mgz8dzcupnjc6jr97ld2sejtlsx5secz7umf",
  "zig14p687ueasdhrxyc0vgu86n7470kxnzhspcmhus",
  "zig1823aqj78c830dhq6vphk0zl0g3jyluyj62aauy",
  "zig1aacv6z00qyysq3fv72xgf484qfagkw23ghjpzl",
  "zig1amrltcghgrqwxlg5umd4qpj8twrse8dew4nrqa",
  "zig1cfggxlp3t42tw00lrszchsn3wxz2m8ph3ajkqn",
  "zig1dfdlez6kl4t0a9gatmwyhazuht7cjvag8sdz82",
  "zig1dxyr5ylnc9jzmdzgh3rrvmxka4w96vpkca3vy2",
  "zig1edjjq0km2al4q5qpnew7phd9yvnkktjvk0hmv5",
  "zig1efxeccpy656jk3f8a43tz23vfevgdvs24hx8g4",
  "zig1fxp0ukmxqd5nn8ze4drr73wvvw90e39w33g3t8",
  "zig1h22mlckxtzsqa32uk4pzn3jkq7du5nc92fyc2u",
  "zig1l9he7lqqjhuezweazkmhmt7fz6snely889qfql",
  "zig1mdd4qgg3px79kj5wrupw08sa26904cwpgay4xw",
  "zig1n8r8ar3hsut5k09gqszelr6d9pvrlynqu4v2vt",
  "zig1qw5nglhmhgq8qzhjpv9sgj3gugsrjvpdt5qq6c",
  "zig1s9vy0lwhrpf6jevnavy8jpe4w2yyzn95dwv685",
  "zig1tp2skcfa70ueqra3rux2xqf4awrhu8hjym8xpq",
  "zig1vsrmy3um9wv866h60zv58kexp0znt0tgd0jtp4",
  "zig1z423zj22sjdfl2jck2p0wdz42fz0qa79fm9mcd",
  "zig1ce7vn3s59sht5vtz9kt0sjhc4k4e0yxhqc34sd",
  "zig14ftnp05yyqpmmtl9lxp3s9trpz9epckjned39q",
  "zig1hn78uspkea2ktwykqwqkgyu9weupsxza63n796",
  "zig1hx8d4nwhg23ptmul644lfl45k4awppgd2hk8jx",
  "zig1l5svsank8kryazy2g0mg3dscepz5mqvszdj35l",
  "zig1mgt5k3eph0j2f4qh88pdwdm7md9tfn05x005z2",
  "zig1mhk2z7w3janq77wwp8e5zx6e24dufpqf345ex6",
  "zig1nk3tg2wx8g204njkd8uw00jqd0l7703k9gy6ey",
  "zig1sa5chp555ak49yzcfm977v46g92dv3jjd37ct6",
  "zig1uvhmu70jr3yf2273r4z3clsguly0c6hjzd8l7e",
  "zig1x0nmuqua59jm3zm2v73pmavvuefldw2cv3wvmg",
  "zig1z3369v6n92g3jgdc6as0d2lufu29fzlk2pcm3s",
  "zig1x76wpaydtgjazrfwt4e4yqfvvm9239892yz6y4",
  "zig17ru9z7g0sccldxl7a8wvlhny23t27tj4475d7x",
  "zig183g323el8zfr6uvp8hn3tdjfpcyws96hnyjjx3",
  "zig1aw7fqdwk2kw479nywvvttnw93fjvnetqwqhwj9",
  "zig1cfx43sg6yjz9mq8hkrdxxtp8z3kaerc7lkhk8a",
  "zig1nlhvx5rehd839ssg6gv2ldlpqc7puz6g4m7t48",
  "zig1esk9drwgyc4jaku0pvnyu5avjau448apg443tm",
  "zig18q2xjsj5rc8tluglpvd7zqx4e99jc7qlxsa7ww",
  "zig18ymplmcnsj6nggrmsmkvwrh0twt68ut87k6lmm",
  "zig1jrmtyf4pxc8q05aymtcgj62td6hpzgpgre55dr",
  "zig14q8mczmvk9yc6xc5a2ghkqapwhek0d2yzf9400",
  "zig15s28hlj8ws9xzqv8emsuz25n9txexllhqeas3f",
  "zig162zjydqnu5js0e3zculsgc69xxdv05zvvxglka",
  "zig169me5dd4fg272g99ke3j8qhw4cpq5nffrcj3hp",
  "zig173ew2j497yj3qd94yh3pmjet2zd2dr0jkk5pwy",
  "zig1da6krwdm9ng0d93t008p0jv8e53grskkpasapk",
  "zig1fpd6ut94msyhwxdaw3jus6kjxttpk2c90gxq4v",
  "zig1gxne824te9ypqknln9nv4npnplfapfkta7z38e",
  "zig1j64zmezlga5p65npge6kp3u7ap4a8lhtkedl5x",
  "zig1jhnzh3vn8dj5vwe8sp6r4tph0e88fpd82n3msr",
  "zig1kcfer5zj8l95d65uv28qzj678sqn8djj2mh6wf",
  "zig1ktj5jssraj4pr0rks2fysglzak2cgfwup9vwvr",
  "zig1ll3caw40caaev7vzpcn69le5y986l7sj55deeg",
  "zig1mmt8aetu0xqzqx0q5y3kzc8w4grqztjecea9y8",
  "zig1mwtacsq6j462j2ez4zpjvh07ax8nywcdwv39pc",
  "zig1naml2249220k3zt8dd44wuqefayxym8z5yypa6",
  "zig1u392khjcz42lmahqmexkm5fdxx2xxtnk6udvn9",
  "zig1j79j2uqr7sdf7lg637cdd9mxp67mfu80tgawkv",
  "zig10ketrgzjg0hfxzn030jn6e2peecd468qae78dn",
  "zig10pms2xn6saas6fzgfnyhd0s9ekqvdz9drqflap",
  "zig10ujhg0wu3znfek2wvvft8klhh9q2mx6qte0ve7",
  "zig12034hha9c7f5l2lwf6323205rm8kymx4frl2aj",
  "zig1227j9qz49z9skwuzrrcf082j4dml78pya0xvml",
  "zig1295thm24g9y9cyuj7y79yjeplksdn9dscwnjv0",
  "zig12ds5aajce7zjccf3thx0d3eqn7yc46607hehqu",
  "zig12eehnmger2uu6prwcccdvvcqe6x4gek4gkss8f",
  "zig12mhaq0fz0zwhcjh6qdvefsjjl9c7myu237k57n",
  "zig12qm078xxxe069w0g9ltgh9sffketes5u47avlt",
  "zig132l3zamjheeemy9leq37pwh7ja7sx44kkm83uz",
  "zig133tngjyd66su6rtca0spzzw0nl7k6jeg09zmh9",
  "zig1378dkrevhzm4tjnyfpqczt7ks3z5f6fy7efhs9",
  "zig13f3xafzc5dmarqjupq7v0k6y9wfsttvhs0xklg",
  "zig13kwq4hlz3ndfpvp2njnnw8467806ra8ttcfdwg",
  "zig140k5cuyclkpkfh4k2tatydp99uvay4pz8qgxmy",
  "zig1455xp0cwksuug8jclrajrt3x0yzf6v08dpx0nf",
  "zig14alh0k07j59swmxt9jtq26dxklwt68a75nxfpq",
  "zig14tr7xw6mpuaz90uf8c6na0ezqwlx2k4clk3zs8",
  "zig14vurmksyk7d907jsdcdmumagtuj8n67xznxw67",
  "zig159zg6rv45xxdgc3k50cl4yp26wwel853uxu8ef",
  "zig16eslhpeeu6v2cn2j2jj430r7e2x4f5mfgsq258",
  "zig16u79acvnfy5pkjd5r9ylhqrz73dn0vaemqcvzs",
  "zig16xlvqx04easpxza3t3sg53899a6uun8aq3uhvv",
  "zig17l4ete0jt2rpypprpn2fqq3ffccqt8077sdv7k",
  "zig189e0ze8244vvwd5uqevc553dfaqjyztjekvut9",
  "zig18ks8n3m6flf4qcg5wzwddghzfzpqs54uc3n5cn",
  "zig18njglyrzfjdq2syfd0ecftz73z9g57ellnsmyu",
  "zig18wlmpuckgzl9vg4vtwlnlw7myedxpn3u5xvaug",
  "zig195xe8m822rjwxmxh6pf2mkczksz3l75jx42ahl",
  "zig19j6d5tehrjuj5jhn59az2y6gfwjc9k8xhkgg6t",
  "zig19lm7vzf7l8ez52nglqq7pswty0vxvjr75utjgu",
  "zig19p5aj02ag0wcwglpdwcraq78g6qx2u09m845sf",
  "zig19wq0lyrfukhx077f9y0a3snlggdszwvq7973rj",
  "zig1a55duv8gp3xa5squsyj26u0dhcp9p64y54v8jc",
  "zig1aeqynhzjlfte8f84glue4vg0v7hf5tmdt9x0dn",
  "zig1avx27gy5t40r6ee4pmc6lwljf6xlau8nnmrn2q",
  "zig1cpzgf7pwhc77knagnsmn3fdax5m07dxede5qlz",
  "zig1czt44nayref2hu2tc72ayx6x4ejryuc9t6ujr6",
  "zig1d574fwn9r98mf0vjy3709hlqzzsrtsrzd5f5v2",
  "zig1dde7c0z5gcwcughsf5drwftj3c9q0m64k8ehu8",
  "zig1djvty35a09qseju0095vhqqyj8p4wsvyzrrkvl",
  "zig1dqffc34e6994mcgxw0hfkhv6f3dkkhplfpca7g",
  "zig1e0n4zzpkkacpk42hgq0fp3yme4utmnyt4rhr0w",
  "zig1e4lk0vyaar0s8f8ly0yuccx7tfarkj4yuyxk2a",
  "zig1e65umccvypkzgxk535n5x0v0098r9d8apyct2e",
  "zig1exkq8w3zq8qppywxr4c767l742as7wrdrv2ncr",
  "zig1fgwtxyg4f8kww2wg4j2es222cytmjt9pmwe02t",
  "zig1gj885059wy26n8pclav0f2xjmry4ftkue3w3sl",
  "zig1gl6jtvxwuycc5r5tek73yqeafpvsrmklzad8vh",
  "zig1h0raltmjy6z7pl6nan5v9ajgxlhgqsg2ep74my",
  "zig1h5q7vfgdpdxgpx5d9u53s5lj7379kg0xp36p9s",
  "zig1j6crfdgvar4jkw79hc7eq6vdzx8y7ept8wu4r3",
  "zig1j9wp2xny5wy2u3g62rengmxnxv4t95j7pp5c26",
  "zig1jhhwy48j7z7r9wtl2ysauqyl4l4awpxa48md6q",
  "zig1jt3pl6lf4dsqjtdj3d9h42fyr8q48dk7klzjkr",
  "zig1k0vtpfztk5kd0dlfpzpdmldn7rygc5f9sf7kfu",
  "zig1kdycckzd5ldkjdvwplucjudtughngqthmgpglt",
  "zig1lg7n0dh387mcv8zvhyyuaha4dm47fnq34vpz40",
  "zig1luks60sl0hd8m4yuhsujr6dys3edy4nka45key",
  "zig1lz5nvf4myvhk5eztp0zk4eqgg0tj2uzvnd5wdc",
  "zig1nd99kvgsmwpzhez3ll24ep9gzghtvxc744dreu",
  "zig1nfv2d28s0533w268dngun2eekjsnwg7wnc9ev4",
  "zig1pg89ykn459p2jjfce9fku3ltf9zfln834ueyh5",
  "zig1qgt0c6dktrnpvh6f5sxvpma600reac03ulates",
  "zig1r6nltluu9qtauz9smnk5gf83rszftj96ahyakn",
  "zig1rmh2xh50jcqrjpq0hnfawdnu4tghxrkqu83m2p",
  "zig1rpc5ncee3sk587v4m6ndrymja8cne6ffskqm20",
  "zig1rx7s9qqjwn0skk5ztp9qqae8srt5drx5nul3aa",
  "zig1s9fd7l73jt8lgl5n296tlxq5wjxcy3w8utmp53",
  "zig1tgqpfdqw2hvw3c7h0qkn24kp8q67w0y9usfehl",
  "zig1u2kttqc7d9w5y27yvf46w65kmaxkj3qxv6tazr",
  "zig1u4eythyr0nzcdytz2kp7d05x8vyhk75zhpp0h2",
  "zig1ucwtvm0xlr9qksvdwjlq4dc7l6kenteptdmjux",
  "zig1uplmtxmd9nm8zdgj0cjsad4zwtzq5lls2r5ntg",
  "zig1vc6etpk7cj2tzyah0nf097pk5txrawxxcva2nc",
  "zig1w8zsys5v5vevwnjpljrxsg4sm53l5z5hh80ye7",
  "zig1w97le3w2mgrxe9hg5h5f5h5estf98x9jz4z4r8",
  "zig1wm4swwq7mj9rljxm4p7zl4lc0kneegv5ttnpsu",
  "zig1wruyfrnz8yef6xcx8z2m78nxer5mmeqst79n2w",
  "zig1wuj9h5anevsh9eucunx2lznyhk4dgwaptvucd7",
  "zig1wuv0p99t4p22sjej7tesqu6fle567ndmfvvlke",
  "zig1xm2dh2cl6p2tzgdt0w6vs3pk55a4gjm4prrcam",
  "zig1xmn90lk9kaqd4ae40wjh3tj7dxc6dxm0w06krw",
  "zig1yfcuhsu827cuqfl3htlzmx67vxyprzad94k297",
  "zig1ylt2ymu4chlnsznds6esg9yjyv9lg4hmd0mmw9",
  "zig1ysd3u2r5la7k427jjcpwrg5232xs4strqccy3r",
  "zig1zjutq8jp3dqthsqzu9ge587als3fz6f4m2808l",
  "zig1zy6t7ce0lzths6nrurs5y898e6rlw6ns6et835",
  "zig1zyp68z387mt8zfv7lcffmxndgwyq6fr0m68yxu",
  "zig1f5rwmztkzpg0atu8y06jcslfswr23v5a0awnqz",
  "zig1nh59skmcj937ep5j89su7vlk4dkwltmkerw2m0",
  "zig1cxe60xyvy8rph59pyrclvnxu2mz92a0pdwrrpa",
  "zig1nv878hq9e7g2nv3nvkscgshjq5rk9t7zjz0ezz",
  "zig1y6s8uylwmypawl3lexsufgyr3at06vxccy6xa3",
  "zig1kw2hfgf94cdk3al0d9fc9ypkvxq75tjrlljvl9",
  "zig106qj6t56r2mh33z9ads2yg92pntewk4t5an5hw",
  "zig124etegja9mswqf7c5dvp5k44uxmsa66yufq6xg",
  "zig13jnqyg8e8u3g4k4lp06yxhelnuheez6ruk7nz3",
  "zig13p9u3r4cq93apu0vqzgcdkjge4jkuncthujx2p",
  "zig15trnjrtz5jfpmgy4g6f3k2hfxmwhj99338u0ed",
  "zig17ynd048vu0u5f5rgrecssgu0jawyw7e92kh7cf",
  "zig18num9p3qhwycngrm2dpny0une5trr3k2w56wf2",
  "zig194egkq8fydepdfv6gpzp0v6wp7eshvpmau5dfg",
  "zig1ak4qqlypf3rjes9l8m79wcf3ceaz4y93qgn9l7",
  "zig1cyxnncnfqx06zen9tlhrt7ymg929zdhx5enagr",
  "zig1dpl6h5aumgxxwap7vap0m0jjr83l7hsy6av6vg",
  "zig1eqzr5qjklpzfn7werh5lvgxwr7awae5vk7cp0q",
  "zig1ervsaggdfz85yv9xfpq4cfy2yajjehkrmltuwa",
  "zig1f0vvtdn23534wxd98vkft7eqg3v4k7ffn7kh2m",
  "zig1j62r7srqddveh4q78thce7f6dpj0zuxg232930",
  "zig1lan7yp5p9dx4p3j5vv69dsgk9m48mq3g4rxer6",
  "zig1r6lla00evlu4ksmmaa6a40ln2g8rcmha7aksg3",
  "zig1tturd32sx83uv765j5xu8sy6krcgr64eauut2n",
  "zig1v5lkmyq6sktlde5pe8d2c2kw0s5uhs5n8m56en",
  "zig16z4pa6l5fh6s6a4n2dp99ys7jma922y5y90kqa",
  "zig1v28rtkp4alekqa24t3cmc0urrxxjv7l78rqh3u",
  "zig1adyh99wjkmx592fq520g96yapjnzdj5xhjuntg",
  "zig1pmgvx8tw37leq29qewdufz5f7jr8h24f0qsvzv",
  "zig128m3cpkvt2zjnh64v37lgementt0ngfnkyng7c",
  "zig15awecph2smm3ytf3ksjtny8gtfc85mhtmh35hq",
  "zig14xxzrncx7r4zey6exmak9ppqqagfdujljwyljl",
  "zig15puvm095n6yq6e6ws4hfs89qcly4armt6ev5sl",
  "zig1avu9gxlc7gxmdqzk49kystw27yes2wlzsh0afv",
  "zig1cth0e2yqsd5xlph73mk8dl53w0kqpfgnp7k386",
  "zig1dv55mqcn5cljl7pgqfejhwhzj2hyy66htmqem4",
  "zig1fz572e3xw8xtwfmq7yplqadzskzzs8knpfflmw",
  "zig1hdq87rzf327fwz8rw9rnmchj7qa3uxrpxds2fw",
  "zig1jaqflv24n5lre2wt5sx08qlu5c5aly2gcyvf90",
  "zig1lun7zgw50p8f67p0lpcr5crfwmgqa6jfwh6mud",
  "zig1pjzecuxkz0a8uj9v2qmgjtqstl4gmz0f7scyg8",
  "zig1w3jge85dfgg2c3qcstn0jxu57j4x7dtc9x8luu",
  "zig1xsa0u535w9lalxj3h9e5xde8jnacfk52wyerxd",
  "zig1jv65s3grqf6v6jl3dp4t6c9t9rk99cd8x4pwth",
  "zig1sca7hnyzgqn5d4ja4phtp487r9ysg4lcf29g68",
  "zig1skck559fpyaanpa2qpewhu423hdxrnj2t5mlte",
  "zig1tdad5vqpm8zdzpysujmjn5m8q6nggpfdxqd2z3",
  "zig1nz0lfp9zj62mp9n600a4u6w9fd46syrk5mwvfj",
  "zig10vjjwdamnr8jjly2ssclj90adp6r29n5tepdep",
  "zig1yezsky8p5wa08k8uk0y66al4270hlzd6fvzfwf",
  "zig1em3z5rrp24j6t0ntw6hvmw6ve6h4s8kkq2tzra",
  "zig1qt8c73faaqxlqm9xmkvetrcrqns4c8n5eruktg",
  "zig1rnfwsgvq34cpqmyfqmzktyxm5sy85wchkwk7uy",
  "zig15vmvtq3d530jt7xwmdg6xlaertxh3l0mt9ae3z",
  "zig1r3ynfrt9qm5z64h6vp3gyz9pqgnnqhdglc6ndy",
  "zig1wukcag4gutavgd0hqnsltjhs880w0uc6dvnes8",
  "zig1aaaqsnx88957hvh54ks5sv3tdxec5kyhhdjdvr",
  "zig1rct7ru5c8szwwtj7fh979qfty8efeshe4lrsqz",
  "zig1s9xn8m4zuj8jatsee4rktyv023mquefexzd9vt",
  "zig12x20rlfhempqqn8mv3eqhk527mepc0qt6f3690",
  "zig14hh7tsqv5pel3y4zyps8qwxu3en6fymcalnhkh",
  "zig1u34hg656dgn584f8tuyxsyqlcvlectxv59z85g",
  "zig132u63k9axjw5c7gmvqdwkfkqhnwuzc2rgd5rvq",
  "zig1qf068l94a4334y2a62jjzx467fyc3hf0vq0g7q",
  "zig1vwl29njfdvnet5kj4mht6devxcgfsamvcu3u6m",
  "zig1x7cuwy8l2fmslg3u2r45xhnp5c23swv4g2ngvd",
  "zig1thhys33kv83c96u0rr9aghwepyahqxz6s75yrk"
] as const;

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function parsePositiveInt(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) {
    return fallback;
  }
  const value = Number.parseInt(raw, 10);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`Invalid ${name}: expected positive integer, got "${raw}"`);
  }
  return value;
}

function parsePositiveNumber(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) {
    return fallback;
  }
  const value = Number(raw);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`Invalid ${name}: expected positive number, got "${raw}"`);
  }
  return value;
}

function parseBoolean(name: string, fallback: boolean): boolean {
  const raw = process.env[name];
  if (!raw) {
    return fallback;
  }
  const normalized = raw.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) {
    return true;
  }
  if (["0", "false", "no", "off"].includes(normalized)) {
    return false;
  }
  throw new Error(`Invalid ${name}: expected boolean, got "${raw}"`);
}

function normalizeWallets(wallets: string[]): Set<string> {
  const normalized = wallets
    .map((wallet) => wallet.trim().toLowerCase())
    .filter(Boolean);
  if (normalized.length === 0) {
    throw new Error("No monitored wallets configured");
  }
  return new Set(normalized);
}

function loadWallets(): Set<string> {
  const raw = process.env.MONITORED_WALLETS;
  if (!raw) {
    return normalizeWallets([...DEFAULT_WALLETS]);
  }
  return normalizeWallets(raw.split(","));
}

export interface AppConfig {
  wsUrl: string;
  monitoredWallets: Set<string>;
  thresholdZig: number;
  thresholdUzig: bigint;
  telegramToken: string;
  telegramChatId: string;
  enableTelegramPolling: boolean;
  minAlertIntervalMs: number;
  maxSeenTx: number;
  reconnectBaseDelayMs: number;
  reconnectMaxDelayMs: number;
}

export const config: AppConfig = {
  wsUrl: process.env.WS_URL?.trim() || "wss://zigchain-mainnet.zigscan.net/websocket",
  monitoredWallets: loadWallets(),
  thresholdZig: parsePositiveNumber("ALERT_THRESHOLD_ZIG", 50_000),
  thresholdUzig: BigInt(
    Math.floor(parsePositiveNumber("ALERT_THRESHOLD_ZIG", 50_000) * 1_000_000)
  ),
  telegramToken: requireEnv("TELEGRAM_BOT_TOKEN"),
  telegramChatId: requireEnv("TELEGRAM_CHAT_ID"),
  enableTelegramPolling: parseBoolean("ENABLE_TELEGRAM_POLLING", false),
  minAlertIntervalMs: parsePositiveInt("MIN_ALERT_INTERVAL_MS", 1_500),
  maxSeenTx: parsePositiveInt("MAX_SEEN_TX", 50_000),
  reconnectBaseDelayMs: parsePositiveInt("RECONNECT_BASE_DELAY_MS", 1_000),
  reconnectMaxDelayMs: parsePositiveInt("RECONNECT_MAX_DELAY_MS", 30_000)
};

