const Main = () => (
    <>
			<main className="container text-center">
					<div className="wrapper wow fadeInUp delay-05s">
							<div className="image-upload-wrap">
									<form>
											<fieldset disabled>
													<input className="file-upload-input" type="file" accept=".docx," />
											</fieldset>
									</form>
									<div className="drag-text">
											<h3>Drag and drop a word file or click to add</h3>
									</div>
							</div>
							<button type="button" className="btn btn-primary btn-lg" id="load" data-loading-text="<i class='fa fa-spinner fa-spin '></i> Converting Order" />
					</div>
			</main>
    </>
)

export default Main;