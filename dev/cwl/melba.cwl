# -----------------------------------------
# Package options (for \usepackage{melba-jmlr})
# -----------------------------------------
#keyvals:\usepackage/melba-jmlr
abbrvbib
nohyperref
hyperref
arxiv
accepted
specialissue
#endkeyvals

# -----------
# Commands
# -----------
# Sectioning commands
\section[short title%title]{title%title}#n
\subsection[short title%title]{title%title}#n
\subsubsection[short title%title]{title%title}#n
\paragraph[short title%title]{title%title}#n
\subparagraph[short title%title]{title%title}#n

# Bibliography commands
\bibpunct{open%text}{close%text}{separator%text}{style%text}{colon%text}{comma%text}#n

# Figure/Table Caption Commands
\figurecaption{name%title}{caption%text}#n
\figurecenter{name%title}{caption%text}#n

# Structuring / Metadata Commands
\appendix#n
\acks{text%text}#n
\ethics{text%text}#n
\coi{text%text}#n
\data{text%text}#n
\researchnote{text%text}#n
\firstpageno{page_number}#n
\melbaid{id}#n
\doi{doi_string}#n
\volume{volume_number}#n
\melbaauthors{author_list%text}#n
\melbayear{year}#n
\datesubmitted{date}#n
\datepublished{date}#n
\melbaspecialissue{issue_name%text}#n
\melbaspecialissueeditors{editor_list%text}#n
\ShortHeadings{short_title%title}{short_authors%text}#n

# Utility commands
\abovestrut{length%l}#n
\belowstrut{length%l}#n
\revision{text%text}#n
\orcid{orcid_id}#n
\BlackBox#n

# ---------------
# Environments
# ---------------
\begin{abstract}#beginEnv#abstract
\end{abstract}#endEnv#abstract

\begin{keywords}#beginEnv#keywords
\end{keywords}#endEnv#keywords

\begin{proof}#beginEnv#proof
\end{proof}#endEnv#proof

\begin{example}#beginEnv#example
\end{example}#endEnv#example

\begin{theorem}#beginEnv#theorem
\end{theorem}#endEnv#theorem

\begin{lemma}#beginEnv#lemma
\end{lemma}#endEnv#lemma

\begin{proposition}#beginEnv#proposition
\end{proposition}#endEnv#proposition

\begin{remark}#beginEnv#remark
\end{remark}#endEnv#remark

\begin{corollary}#beginEnv#corollary
\end{corollary}#endEnv#corollary

\begin{definition}#beginEnv#definition
\end{definition}#endEnv#definition

\begin{conjecture}#beginEnv#conjecture
\end{conjecture}#endEnv#conjecture

\begin{axiom}#beginEnv#axiom
\end{axiom}#endEnv#axiom